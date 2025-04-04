import { NextFunction, Request, Response, Router } from "express";
import { addToContact, getAllUserContacts, getContactbyId } from "./module";
import { StatusCodes } from "http-status-codes";
const route = Router();

route.post(
  "/add/contact",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const user = (req as any).user;

      res.status(200).send(await addToContact(data, user));
    } catch (error) {
      next(error);
    }
  }
);
route.get(
  "/contact",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        user: { id },
      } = req as any;

      res.status(200).send(await getAllUserContacts(id));
    } catch (error) {
      next(error);
    }
  }
);
route.get(
  "/contact/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      res.status(StatusCodes.OK).send(await getContactbyId(id));
    } catch (error) {
      next(error);
    }
  }
);

export default route;
