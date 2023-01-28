import { Request, Response } from "express";
import { User } from "../models/User";
import { Role } from "../models/Role";
import { responseFailed, responseSuccess } from "../lib/helpers/response";

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll({
    include: [Role],
    attributes: {
      exclude: ["password"],
    },
  });

  responseSuccess(res, users);
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
    },
    include: [Role],
    attributes: {
      exclude: ["password"],
    },
  });

  if (!user) {
    return responseFailed(res, "User not found");
  }

  responseSuccess(res, user);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    email,
    password,
    name,
    surName,
    phone,
    mobile,
    address,
    isActive,
    isAdmin,
    roleId,
    presenter,
  } = req.body;

  const user = await User.findOne({
    where: {
      id,
    },
  });

  if (!user) {
    return responseFailed(res, "User not found");
  }

  const userCheck = await User.findOne({
    where: {
      email,
    },
  });

  if (userCheck && userCheck.id !== id) {
    return responseFailed(res, "Email is exist");
  }

  await user.update(
    {
      email,
      password,
      name,
      surName,
      phone,
      mobile,
      address,
      isActive,
      isAdmin,
      roleId,
      presenter,
    },
    {
      where: {
        id,
      },
    }
  );

  responseSuccess(res, null, "User updated successfully");
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
    },
  });

  if (!user) {
    return responseFailed(res, "User not found");
  }

  await user.destroy();

  responseSuccess(res, null, "User deleted successfully");
};

export const loginByEmail = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    return responseFailed(res, "Invalid Username or Password");
  }

  if (!(await user.validatePassword(password))) {
    return responseFailed(res, "Invalid Username or Password");
  }

  const token = await user.generateToken();

  responseSuccess(res, { token });
};

export const registerByEmail = async (req: Request, res: Response) => {
  const { email, password, name, surName, phone, mobile, address, presenter } =
    req.body;
  const userCheck = await User.findOne({ where: { email } });
  if (userCheck) {
    return responseFailed(res, "email is exist");
  }

  const user = await User.create({
    email,
    password,
    name,
    surName,
    phone,
    mobile,
    address,
    isActive: true,
    roleId: 2,
    presenter,
  });

  responseSuccess(res, user);
};


export const loginByPhone = async (req: Request, res: Response) => {
  const { phone } = req.body;

  let user = await User.findOne({
    where: {
      phone,
    },
  });

  if (!user) {
    user = await User.create({
      phone,
      isActive: true,
      roleId: 2,
    });
  }else{
    if(user.codeExpierTime > new Date().getTime()){
      return responseFailed(res, "Code is not expired");
    }
  }

  user.codeRegister = Math.floor(10000 + Math.random() * 90000).toString();
  user.codeExpierTime = new Date().getTime() + 1000 * 60 * 2;
  await user.save();  

  // TODO SEND SMS and clear code on header

  res.set("token", user.codeRegister );
  responseSuccess(res, null, "Code sent successfully");
}

export const registerByPhone = async (req: Request, res: Response) => {
  const { phone, code } = req.body;

  const user = await User.findOne({
    where: {
      phone,
    },
  });

  if (!user) {
    return responseFailed(res, "User not found");
  }

  if (user.codeRegister !== code) {
    return responseFailed(res, "Invalid code");
  }

  if (user.codeExpierTime < new Date().getTime()) {
    return responseFailed(res, "Code is expired");
  }

  const token = await user.generateToken();

  responseSuccess(res, { token });
};