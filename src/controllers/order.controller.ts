import { Request, Response } from "express";
import { Op } from "sequelize";
import { responseSuccess, responseFailed } from "../lib/helpers/response";
import {
  Product,
  User,
  Order,
  OrderItem,
  OrderStatusCodeType,
  PaymentStatusCodeType,
  Address,
  Discount,
} from "../models";
import { RequestUserType } from "../types/RequestTypes";
import dayjs from "dayjs";
import { getCouponDiscount } from "../lib/helpers/discount";
import { OrderType } from "../types/product";
import { getAvailableProducts } from "../lib/helpers/product";

export const getOrders = async (req: Request, res: Response) => {
  const orders = await Order.findAll({
    attributes: {
      exclude: ["updatedAt"],
    },
    include: [
      {
        model: User,
        attributes: ["id", "name", "email", "mobile"],
      },
    ],
  });
  return responseSuccess(res, orders);
};

export const getOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await Order.findOne({
    where: { id },
    attributes: {
      exclude: ["updatedAt"],
    },
    include: [
      {
        model: User,
        attributes: ["id", "name", "email", "mobile"],
      },
      {
        model: OrderItem,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: Product,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      },
    ],
  });
  return responseSuccess(res, order);
};

export const createOrder = async (req: RequestUserType, res: Response) => {
  const userId = req.user.id;
  const {
    orderItems,
    addressId,
    comment,
    isRequiredFactor,
    couponCode,
  }: OrderType = req.body;

  const address = await Address.findOne({ where: { id: addressId } });
  const orderNumber = await getOrderNumber();
  const discount = await getCouponDiscount(couponCode);
  const products = await getAvailableProducts(orderItems);
  const orderTotal = products.reduce(
    (total: number, product: any) =>
      total + product.price * product.orderItem.quantity,
    0
  );

  const orderTax = products.reduce(
    (total: number, product: any) =>
      total +
      product.price * product.orderItem.quantity * product.taxCategory.percent,
    0
  );


  const couponDiscount = discount(orderTotal);
  const customerIp =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const order = {
    orderNumber,
    customerIp,
    orderStatusCode: OrderStatusCodeType.Pending,
    paymentStatusCode: PaymentStatusCodeType.Pending,
    userId,
    addressId,
    customerOrderComment: comment,
    location: address?.location,
    date: dayjs().format("YYYY-MM-DD"),
    time: dayjs().format("HH:mm"),
    isRequiredFactor,
    couponCode,
    couponDiscount,
    orderDiscount: couponDiscount,
    orderShipping: 0,
    orderTax,
    orderTotal,
  };

    const orderCreated = await Order.create(order);
    const orderItemsCreated = await OrderItem.bulkCreate(
        products.map((product: any) => ({
            orderId: orderCreated.id,
            productId: product.id,
            price: product.price,
            quantity: product.orderItem.quantity,
            tax: product.price * product.orderItem.quantity * product.taxCategory.percent,
            discount: 0,
            colorId: product.orderItem.colorId,
            colorName: product.orderItem.colorName,
        }))
    );

    return responseSuccess(res, orderCreated,"Your order has been created successfully");
};

const getOrderNumber = async () => {
  const year = +dayjs().format("YYYY");
  const month = +dayjs().format("MM");
  const day = +dayjs().format("DD");
  const count = await Order.count({
    where: {
      createdAt: {
        [Op.between]: [
          new Date(year, month - 1, day),
          new Date(year, month, day),
        ],
      },
    },
  });
  const orderNumber = `OR-${year}${month}${day}${count + 1}`;

  return orderNumber;
};

const getProductsWithTax = (products: Product[]) => {
  return products.map((product: Product) => {
    const productWithTax = {
      ...product,
      tax: product.price * 0.09,
    };
    return productWithTax;
  });
};
