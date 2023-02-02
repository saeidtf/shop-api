import { Request, Response } from "express";
import { responseFailed, responseSuccess } from "../lib/helpers/response";
import { Discount } from "../models";

export const getDiscounts = async (req: Request, res: Response) => {
  const discounts = await Discount.findAll({
    attributes: [
      "id",
      "name",
      "usePercentage",
      "discountPercentage",
      "discountAmount",
      "startDate",
      "endDate",
      "requiresCouponCode",
      "couponCode",
    ],
    order: [["id", "DESC"]],
  });

  return responseSuccess(res, discounts);
};

export const getDiscount = async (req: Request, res: Response) => {
  const { id } = req.params;
  const discount = await Discount.findOne({
    attributes: [
      "id",
      "name",
      "usePercentage",
      "discountPercentage",
      "discountAmount",
      "startDate",
      "endDate",
      "requiresCouponCode",
      "couponCode",
    ],
    where: {
      id,
    },
  });

  if (!discount) {
    return responseFailed(res, "Discount not found");
  }

  return responseSuccess(res, discount);
};

export const createDiscount = async (req: Request, res: Response) => {
  let {
    name,
    usePercentage,
    discountPercentage,
    discountAmount,
    startDate,
    endDate,
    requiresCouponCode,
    couponCode,
  } = req.body;

  if (usePercentage) {
    discountAmount = 0;
  } else {
    discountPercentage = 0;
  }

  if (requiresCouponCode) {
    if (!couponCode) {
      return responseFailed(res, "Coupon code is required");
    }
  }

  const discount = await Discount.create({
    name,
    usePercentage,
    discountPercentage,
    discountAmount,
    startDate,
    endDate,
    requiresCouponCode,
    couponCode,
  });

  return responseSuccess(res, discount);
};

export const updateDiscount = async (req: Request, res: Response) => {
  const { id } = req.params;
  let {
    name,
    usePercentage,
    discountPercentage,
    discountAmount,
    startDate,
    endDate,
    requiresCouponCode,
    couponCode,
  } = req.body;

  const discount = await Discount.findOne({
    where: {
      id,
    },
  });

  if (!discount) {
    return responseFailed(res, "Discount not found");
  }

  if (requiresCouponCode) {
    if (!couponCode) {
      return responseFailed(res, "Coupon code is required");
    }
  }

  if (usePercentage) {
    discountAmount = 0;
  } else {
    discountPercentage = 0;
  }

  await discount.update({
    name,
    usePercentage,
    discountPercentage,
    discountAmount,
    startDate,
    endDate,
    requiresCouponCode,
    couponCode,
  });

  return responseSuccess(res, discount);
};

export const deleteDiscount = async (req: Request, res: Response) => {
  const { id } = req.params;

  const discount = await Discount.findOne({
    where: {
      id,
    },
  });

  if (!discount) {
    return responseFailed(res, "Discount not found");
  }

  await discount.destroy();

  return responseSuccess(res, discount);
};

