import express, { NextFunction, Request, Response } from "express";
import { APIError } from "./utils/CustomError";
import morgan from "morgan";
import route from "./user/router";
import cors from "cors";
import bodyParser from "body-parser";
export const app = express();

// app.use((req: Request, res: Response, next: NextFunction) => {
//   console.log(req.method, req.protocol, req.ip, req.baseUrl, req.url);
//   next();
// });
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", route);

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
