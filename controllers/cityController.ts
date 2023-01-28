import { Request, Response } from "express";
import { responseFailed, responseSuccess } from "../lib/helpers/response";
import { City } from "../models";

export const getCities = async (req: Request, res: Response) => {
  const cities = await City.findAll({
    attributes: ["id", "name", "provinceId"],
    order: [["name", "ASC"]],
    include: [
      {
        association: "province",
        attributes: ["id", "name"],
      },
    ],
  });

  return responseSuccess(res, cities);
};

export const getCity = async (req: Request, res: Response) => {
  const { id } = req.params;
  const city = await City.findOne({
    attributes: ["id", "name", "provinceId"],
    include: [
      {
        association: "province",
        attributes: ["id", "name"],
      },
    ],
    where: {
      id,
    },
  });

  return responseSuccess(res, city);
};

export const createCity = async (req: Request, res: Response) => {
  let { name, provinceId } = req.body;

  const city = await City.create({
    name,
    provinceId,
  });

  return responseSuccess(res, city);
};

export const updateCity = async (req: Request, res: Response) => {
  const { id } = req.params;
  let { name, provinceId } = req.body;

  const city = await City.findByPk(id);

  if (!city) {
    return responseFailed(res, "City not found");
  }

  city.name = name;
  city.provinceId = provinceId;
  await city.save();

  return responseSuccess(res, city, "City updated");
};

export const deleteCity = async (req: Request, res: Response) => {
  const { id } = req.params;

  const city = await City.findByPk(id);

  if (!city) {
    return responseFailed(res, "City not found");
  }

  await city.destroy();

  return responseSuccess(res, null, "City deleted");
};
