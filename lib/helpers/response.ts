import { Response } from "express";

export const responseSuccess = (
  res: Response,
  data?: Object | null,
  message?: string
) => {
  res.status(200).json({
    success: true,
    data,
    message,
  });
};

export const responseFailed = (
  res: Response,
  message?: string,
  status = 200
) => {
  res.status(status).json({
    success: false,
    message,
  });
};
