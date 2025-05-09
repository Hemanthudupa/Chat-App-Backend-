import { NextFunction, Request, Response, Router } from "express";
import profile from "../utils/profile/profile-pic";
import statusCode, { StatusCodes } from "http-status-codes";
import { signUpUser, userLogin } from "./module";
import { APIError } from "../utils/CustomError";
import { Music } from "../music/model";
import { createReadStream } from "fs";
const route = Router();

route.post(
  "/signup",
  profile.none(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      // data.destination =
      //   req.file?.destination + "\\" + (req as any).file.filename;
      res.status(statusCode.CREATED).send(await signUpUser(data));
    } catch (error) {
      next(error);
    }
  }
);
route.post(
  "/profile",
  profile.single("profile"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).send({
        destination: req.file?.destination + "\\" + (req as any).file.filename,
      });
    } catch (error) {
      next(error);
    }
  }
);

route.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      res.status(statusCode.OK).send(await userLogin(data));
    } catch (error) {
      next(error);
    }
  }
);

route.get(
  "/music/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw new APIError("No id provided", "NO ID PROVIDED");
      }
      const music = await Music.findOne({ where: { id } });
      if (!music) {
        throw new APIError("No music found", "NO MUSIC FOUND");
      }
      res.status(StatusCodes.OK).sendFile(music.songUrl);
    } catch (error) {
      next(error);
    }
  }
);
export default route;
