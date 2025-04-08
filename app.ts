import express, { NextFunction, Request, Response } from "express";
import { APIError } from "./utils/CustomError";
import morgan from "morgan";
import user from "./user/router";
import cors from "cors";
import bodyParser from "body-parser";
import { ensureUser } from "./utils/Authentication";
import contact from "./contacts/route";
import { Server } from "socket.io";
import { createServer } from "http";
import rateLimit from "express-rate-limit";
import User from "./user/model";
import { getContactbyId } from "./contacts/module";
import { Contact } from "./contacts/model";
import message from "./Message/route";
import { Message } from "./Message/model";
export const app = express();

export const server = createServer(app);
export const io = new Server(server, {
  cors: { maxAge: 10000, origin: "*" },
  transports: ["websocket"],
});
// app.use((req: Request, res: Response, next: NextFunction) => {
//   console.log(req.method, req.protocol, req.ip, req.baseUrl, req.url);
//   next();
// });
app.use(
  rateLimit({
    message: "maximum rate limit exceeeded",
    limit: 10,
    windowMs: 1000,
  })
);
const users = new Map();

io.on("connect", (socket) => {
  console.log(
    socket.handshake.query,
    " just now connected with an socket id",
    socket.id
  );
  socket.on("private-message", async (obj) => {
    const contact = await Contact.findOne({
      where: { id: obj.to },
    });
    if (!contact) {
      throw new APIError("invalid user Id", "INVALID USER ID");
    }

    console.log(obj.message);

    console.log("sending data ");
    let recipientSocketId = users.get(contact.contactUserId);
    socket.to(recipientSocketId).emit("response", {
      from: socket.id, // optional: identify sender
      message: obj.message,
      senderId: contact.id,
    });
    console.log("sending data to ", recipientSocketId);
  });
  socket.on("register", ({ userId }) => {
    users.set(userId, socket.id); // Map userId → socket.id
  });

  socket.on("disconnect", () => {
    console.log(" invoked disconnection ", users);
    users.forEach((id, key) => {
      console.log(id);
      if (id === socket.id) {
        console.log(socket.id, "is now disconnected ");
        users.delete(key);
      }
    });
  });
  socket.on("create-room", ({ senderUserId, contactId }) => {
    const roomId = [senderUserId, contactId].sort().join("_");
    socket.join(roomId);
    console.log(socket.id, "joined room", roomId); // Add this log
  });

  socket.on(
    "send-message",
    async ({ roomId, senderUserId, contactId, message }) => {
      if (!contactId)
        throw new APIError(
          " contact id cant be emptied ",
          " CONTACT ID CANNOT BE EMPTIED "
        );
      console.log(contactId, " is the contact id man ");
      await Message.create({
        roomId,
        senderUserId: senderUserId,
        recieverUserId: contactId,
        message,
      } as any);
      io.to(roomId).emit("recive-message", {
        roomId,
        senderUserId, // the person who sent it
        receiverId: contactId,
        message,
      });
    }
  );
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", user);
app.use(ensureUser);
app.use("/contacts", contact);
app.use("/message", message);
app.use(errorHandler);
function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof APIError) {
    res.status(400).send({
      message: error.message,
      code: error.code,
    });
  } else {
    res.status(400).send({
      message: error.message,
      code: "ERROR !!!",
    });
  }
}
