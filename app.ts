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
  console.log(socket.id, " just now connected ");
  socket.on("private-message", async (obj) => {
    const contact = await Contact.findOne({
      where: { id: obj.to },
      // include: {
      //   model: User,
      //   as: "user",
      //   attributes: [["id", "userId"]],
      // },
    });
    if (!contact) {
      throw new APIError("invalid user Id", "INVALID USER ID");
    }
    console.log(contact.id, " is the user id ");
    const data = users.get(contact.id);

    console.log(data, " is the end user id ", obj.message);
  });
  socket.on("register", async ({ userId }) => {
    users.set(userId, socket.id);
    console.log(userId);
    console.log(" registerred ");
  });
  socket.on("disconnect", () => {
    users.forEach((id, key) => {
      if (id === socket.id) users.delete(key);
    });
  });

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/user", user);
  app.use(ensureUser);
  app.use("/contacts", contact);
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
});
