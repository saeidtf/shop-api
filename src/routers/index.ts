import { Application, Response, Request } from "express";
import {userRouter} from "./user";
import {getCategories} from "../controllers";

export default (app: Application) => {
  app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
  });

  app.get("/categories", getCategories);

  app.use("/users", userRouter());
};
