import { NextFunction, Request, Response, Router } from "express";
import profile from "../utils/profile/profile-pic";
const route = Router();

// route.post(
//   "/sign-up",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const {userName,} = req.body;
//     } catch (error) {
//       next(error);
//     }
//   }
// );
route.post(
  "/profile/user",
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

export default route;
