import { Application, Response, Request } from "express";
import {userRouter} from "./user";

export default (app: Application) => {
  app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
  });

  app.use("/users", userRouter());
};
