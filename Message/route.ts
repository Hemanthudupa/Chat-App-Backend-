import { NextFunction, Request, Response, Router } from "express";
import sendFiles from "../utils/messages-files/files";
import { StatusCodes } from "http-status-codes";
import { getMessages, sendMessage } from "./module";
const route = Router();
route.post(
  "/send-message",
  sendFiles.array("file"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const files: any = req.files;
      console.log(files);
      if (files && files.length > 0) {
        data.imagesPath = files
          .map((ele: any) => {
            return ele.path;
          })
          .join(";");
      }

      res.status(StatusCodes.CREATED).send(await sendMessage(data));
    } catch (error) {
      next(error);
    }
  }
);

route.get(
  "/messages",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const details = req.query;
      res.status(StatusCodes.OK).send(await getMessages(details));
    } catch (error) {
      next(error);
    }
  }
);
export default route;
