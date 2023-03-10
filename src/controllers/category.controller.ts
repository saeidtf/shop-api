import { Request, Response } from "express";
import { Op } from "sequelize";
import { responseFailed, responseSuccess } from "../lib/helpers/response";
import { Category } from "../models";

export const getCategories = async (req: Request, res: Response) => {
  const categories = await Category.findAll({
    attributes: {
      exclude: ["deleted", "createdAt", "updatedAt"],
    },
    order: [["displayOrder", "ASC"]],
    where: {
      deleted: false,
    },
  });

  return responseSuccess(res, categories);
};

export const getCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await Category.findOne({
    attributes: {
      exclude: ["deleted", "createdAt", "updatedAt"],
    },
    where: {
      deleted: false,
      id,
    },
  });

  return responseSuccess(res, category);
};

export const createCategory = async (req: Request, res: Response) => {
  let {
    name,
    description,
    metaKeywords,
    metaDescription,
    metaTitle,
    image,
    icon,
    showOnHomePage,
    displayOrder,
    published,
    path,
    parentId
  } = req.body;

  const files = req.files;
  if (files) {
    const imageFile = files?.image as any;
    const iconFile = files?.icon as any;
    image = imageFile.name;
    icon = iconFile.name;

    imageFile?.mv(`./public/images/categories/${imageFile.name}`, (err: any) => {
      if (err) {
        console.log(err);
      }
    });

    iconFile?.mv(
      `./public/images/categories/icons/${iconFile.name}`,
      (err: any) => {
        if (err) {
          console.log(err);
        }
      }
    );
  }

  const category = await Category.create({
    name,
    description,
    metaKeywords,
    metaDescription,
    metaTitle,
    image,
    icon,
    showOnHomePage,
    displayOrder,
    published,
    path,
    parentId
  });

  return responseSuccess(res, category);
};

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  let {
    name,
    description,
    metaKeywords,
    metaDescription,
    metaTitle,
    image,
    icon,
    showOnHomePage,
    displayOrder,
    published,
    path,
    parentId,
  } = req.body;
  const category = await Category.findByPk(id);
  if (!category) {
    return responseFailed(res, "Category not found");
  }

  const categoryExist = await Category.findOne({
    where: {
      id: {
        [Op.ne]: id,
      },
      name,
    },
  });
  if (categoryExist) {
    return responseFailed(res, "Category already exist");
  }

  const files = req.files;
  if (files) {
    const imageFile = files?.image as any;
    const iconFile = files?.icon as any;
    image = imageFile.name;
    icon = iconFile.name;

    imageFile?.mv(`public/images/categories/${imageFile.name}`, (err: any) => {
      if (err) {
        console.log(err);
      }
    });

    iconFile?.mv(
      `public/images/categories/icons/${iconFile.name}`,
      (err: any) => {
        if (err) {
          console.log(err);
        }
      }
    );
  }

  category.name = name;
  category.description = description;
  category.metaKeywords = metaKeywords;
  category.metaDescription = metaDescription;
  category.metaTitle = metaTitle;
  category.image = image;
  category.icon = icon;
  category.showOnHomePage = showOnHomePage;
  category.displayOrder = displayOrder;
  category.published = published;
  category.path = path;
  category.parentId = parentId;
  await category.save();

  return responseSuccess(res, category);
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await Category.findByPk(id);
  if (!category) {
    return responseFailed(res, "Category not found");
  }

  category.deleted = true;
  await category.save();

  return responseSuccess(res, category);
};

export const getCategoriesByDiscount = async (req: Request, res: Response) => {
  const { id } = req.params;
  const categories = await Category.findAll({
    attributes: [
      "id",
      "name",
      "description",
      "metaKeywords",
      "metaDescription",
      "metaTitle",
      "image",
      "icon",
      "showOnHomePage",
      "displayOrder",
      "published",
      "path",
    ],
    include: [
      {
        association: "discounts",
        where: {
          id,
        },
      },
    ],
  });

  return responseSuccess(res, categories);
};

export const addDiscountToCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { discountId } = req.body;
  const category = await Category.findByPk(id);
  if (!category) {
    return responseFailed(res, "Category not found");
  }

  await category.$add("discounts", discountId);

  return responseSuccess(res, category);
};

export const removeDiscountFromCategory = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { discountId } = req.body;
  const category = await Category.findByPk(id);
  if (!category) {
    return responseFailed(res, "Category not found");
  }

  await category.$remove("discounts", discountId);

  return responseSuccess(res, category);
};

export const getCategoriesByProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const categories = await Category.findAll({
    attributes: [
      "id",
      "name",
      "description",
      "metaKeywords",
      "metaDescription",
      "metaTitle",
      "image",
      "icon",
      "showOnHomePage",
      "displayOrder",
      "published",
      "path",
    ],
    include: [
      {
        association: "products",
        where: {
          id,
        },
      },
    ],
  });

  return responseSuccess(res, categories);
};

export const addProductToCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { productId } = req.body;
  const category = await Category.findByPk(id);
  if (!category) {
    return responseFailed(res, "Category not found");
  }

  await category.$add("products", productId);

  return responseSuccess(res, category);
};

export const removeProductFromCategory = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { productId } = req.body;
  const category = await Category.findByPk(id);
  if (!category) {
    return responseFailed(res, "Category not found");
  }

  await category.$remove("products", productId);

  return responseSuccess(res, category);
};
