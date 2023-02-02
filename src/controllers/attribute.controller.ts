import { Request, Response } from "express";
import { Op } from "sequelize";
import { responseFailed, responseSuccess } from "../lib/helpers/response";
import {
  SpecificationAttribute,
  SpecificationAttributeOption,
} from "../models";

export const getAttibutes = async (req: Request, res: Response) => {
  const attributes = await SpecificationAttribute.findAll({
    attributes: ["id", "name", "displayOrder"],
    order: [["displayOrder", "ASC"]],
    include: [
      {
        model: SpecificationAttributeOption,
      },
    ],
  });

  return responseSuccess(res, attributes);
};

export const getAttribute = async (req: Request, res: Response) => {
  const { id } = req.params;
  const attribute = await SpecificationAttribute.findByPk(id, {
    attributes: ["id", "name", "displayOrder"],
    include: [
      {
        model: SpecificationAttributeOption,
        attributes: ["id", "name", "displayOrder"],
        order: [["displayOrder", "ASC"]],
        required: false,
      },
    ],
    order: [["displayOrder", "ASC"]],
  });

  return responseSuccess(res, attribute);
};

export const createAttribute = async (req: Request, res: Response) => {
  const { name, displayOrder } = req.body;
  const attribute = await SpecificationAttribute.create({
    name,
    displayOrder,
  });

  return responseSuccess(res, attribute);
};

export const updateAttribute = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, displayOrder } = req.body;
  const attribute = await SpecificationAttribute.findByPk(id);
  if (!attribute) {
    return responseFailed(res, "Attribute not found");
  }

  const attributeExist = await SpecificationAttribute.findOne({
    where: {
      name,
      id: {
        [Op.ne]: id,
      },
    },
  });
  if (attributeExist) {
    return responseFailed(res, "Attribute name already exist");
  }

  attribute.name = name;
  attribute.displayOrder = displayOrder;
  await attribute.save();

  return responseSuccess(res, attribute);
};

export const deleteAttribute = async (req: Request, res: Response) => {
  const { id } = req.params;
  const attribute = await SpecificationAttribute.findByPk(id);
  if (!attribute) {
    return responseFailed(res, "Attribute not found");
  }

  const attributeOptions = await SpecificationAttributeOption.findAll({
    where: {
      specificationAttributeId: id,
    },
  });
  if (attributeOptions.length > 0) {
    return responseFailed(res, "Attribute has options");
  }

  await attribute.destroy();

  return responseSuccess(res, attribute);
};

export const createAttributeOption = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, displayOrder } = req.body;
  const attribute = await SpecificationAttribute.findByPk(id);
  if (!attribute) {
    return responseFailed(res, "Attribute not found");
  }

  const option = await SpecificationAttributeOption.create({
    name,
    displayOrder,
    specificationAttributeId: id,
  });

  return responseSuccess(res, option);
};

export const updateAttributeOption = async (req: Request, res: Response) => {
  const { id, optionId } = req.params;
  const { name, displayOrder } = req.body;
  const attribute = await SpecificationAttribute.findByPk(id);
  if (!attribute) {
    return responseFailed(res, "Attribute not found");
  }

  const option = await SpecificationAttributeOption.findByPk(optionId);
  if (!option) {
    return responseFailed(res, "Option not found");
  }

  option.name = name;
  option.displayOrder = displayOrder;
  await option.save();

  return responseSuccess(res, option);
};

export const deleteAttributeOption = async (req: Request, res: Response) => {
  const { id, optionId } = req.params;
  const attribute = await SpecificationAttribute.findByPk(id);
  if (!attribute) {
    return responseFailed(res, "Attribute not found");
  }

  const option = await SpecificationAttributeOption.findByPk(optionId);
  if (!option) {
    return responseFailed(res, "Option not found");
  }

  await option.destroy();

  return responseSuccess(res, option);
};

