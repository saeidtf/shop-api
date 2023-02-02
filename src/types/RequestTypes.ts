import { Request } from "express";
export type RequestUserType = Request & { user: UserType };
export type UserType = {
  id: number;
  name: string;
  email: string;
  mobile: string;
  surename: string;
};
