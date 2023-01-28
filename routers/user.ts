import { Request, Response, Router } from "express";
import { Role } from "../models";
import { User } from "../models/User";
import {loginByEmail , loginByPhone} from "../controllers";

export const userRouter = () => Router()
  .get("/", async (req: Request, res: Response) => {
    console.log("GET /users");
    const users = await User.findAll({
      include: [Role],
    });
    res.send(users);
  })
  .post("/", async (req: Request, res: Response) => {
    const { email, password, name, surName, phone, mobile, address } = req.body;
    const userCheck = await User.findOne({ where: { email } });
    if (userCheck) {
      res.status(400).json({
        success:false,
        message: "email is exist",
      });
      return;
    }    

    const user = await User.create({ email, password, name, surName, phone, mobile, address , isActive:true , roleId:2 });
    res.send(user);
  })
  .post("/login", loginByPhone);