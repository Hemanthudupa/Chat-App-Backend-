import { NextFunction, Request, Response, Router } from "express";
const route = Router();
import { APIError } from "../utils/CustomError";
import music_multer from "../utils/upload-music/music";
import { addMusicToDB, getAllMusics } from "./module";
import { StatusCodes } from "http-status-codes";

route.post(
  "/music",
  music_multer.array("music"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        throw new APIError("No files uploaded", "NO FILES UPLOADED");
      }

      res.status(200).send(await addMusicToDB(files, req.body));
    } catch (error) {
      next(error);
    }
  }
);

route.get("/music", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(StatusCodes.OK).send(await getAllMusics());
  } catch (error) {
    next(error);
  }
});

export default route;
