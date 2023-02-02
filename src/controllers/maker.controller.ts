import { Request, Response } from "express";
import { Maker } from "../models/Maker";
import { responseSuccess, responseFailed } from "../lib/helpers/response";
import { MakerBrand, Product } from "../models";

export const getMakers = async (req: Request, res: Response) => {
  const makers = await Maker.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    order: [["displayOrder", "ASC"]],
  });
  return responseSuccess(res, makers);
};

export const getMaker = async (req: Request, res: Response) => {
  const maker = await Maker.findByPk(req.params.id, {
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  return responseSuccess(res, maker);
};

export const createMaker = async (req: Request, res: Response) => {
  let { name, image, logo, metaKeywords, metaDescription, metaTitle } =
    req.body;

  const files = req.files;
  if (files) {
    const imageFile = files?.image as any;
    const logoFile = files?.logo as any;
    image = imageFile.name;
    logo = logoFile.name;

    imageFile?.mv(`public/images/makers/${image}`, (err: any) => {
      if (err) {
        console.log(err);
      }
    });

    logoFile?.mv(`public/images/makers/logo/${logo}`, (err: any) => {
      if (err) {
        console.log(err);
      }
    });
  }

  const maker = await Maker.create({
    name,
    image,
    logo,
    metaKeywords,
    metaDescription,
    metaTitle,
  });
  return responseSuccess(res, maker, "Maker created");
};

export const updateMaker = async (req: Request, res: Response) => {
  const { id } = req.params;
  let { name, image, logo, metaKeywords, metaDescription, metaTitle } =
    req.body;
  const maker = await Maker.findByPk(id);
  if (!maker) {
    return responseFailed(res, "Maker not found");
  }

  const files = req.files;
  if (files) {
    const imageFile = files?.image as any;
    const logoFile = files?.logo as any;
    image = imageFile.name;
    logo = logoFile.name;

    imageFile?.mv(`public/images/makers/${image}`, (err: any) => {
      if (err) {
        console.log(err);
      }
    });

    logoFile?.mv(`public/images/makers/logo/${logo}`, (err: any) => {
      if (err) {
        console.log(err);
      }
    });
  }

  maker.name = name;
  maker.image = image;
  maker.logo = logo;
  maker.metaKeywords = metaKeywords;
  maker.metaDescription = metaDescription;
  maker.metaTitle = metaTitle;
  await maker.save();
  return responseSuccess(res, maker, "Maker updated");
};

export const deleteMaker = async (req: Request, res: Response) => {
  const { id } = req.params;
  const maker = await Maker.findByPk(id);
  if (!maker) {
    return responseFailed(res, "Maker not found");
  }
  const makerBrands = await maker.$get("makerBrands");
  if (makerBrands.length > 0) {
    return responseFailed(res, "Maker has brands");
  }

  await maker.destroy();
  return responseSuccess(res, null, "Maker deleted");
};

export const getMakerBrands = async (req: Request, res: Response) => {
  const makerBrands = await MakerBrand.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    order: [["displayOrder", "ASC"]],
  });
  return responseSuccess(res, makerBrands);
};

export const getMakerBrand = async (req: Request, res: Response) => {
  const makerBrand = await MakerBrand.findByPk(req.params.id, {
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  return responseSuccess(res, makerBrand);
};

export const createMakerBrand = async (req: Request, res: Response) => {
  let { name, image, displayOrder, makerId } = req.body;

  const maker = await Maker.findByPk(makerId);
  if (!maker) {
    return responseFailed(res, "Maker not found");
  }

  const files = req.files;
  if (files) {
    const imageFile = files?.image as any;
    image = imageFile.name;

    imageFile?.mv(`public/images/maker-brands/${image}`, (err: any) => {
      if (err) {
        console.log(err);
      }
    });
  }

  const makerBrand = await MakerBrand.create({
    name,
    image,
    displayOrder,
    makerId,
  });
  return responseSuccess(res, makerBrand, "Maker brand created");
};

export const updateMakerBrand = async (req: Request, res: Response) => {
  const { id } = req.params;
  let { name, image, displayOrder, makerId } = req.body;
  const makerBrand = await MakerBrand.findByPk(id);
  if (!makerBrand) {
    return responseFailed(res, "Maker brand not found");
  }

  const maker = await Maker.findByPk(makerId);
  if (!maker) {
    return responseFailed(res, "Maker not found");
  }

  const files = req.files;
  if (files) {
    const imageFile = files?.image as any;
    image = imageFile.name;

    imageFile?.mv(`public/images/maker-brands/${image}`, (err: any) => {
      if (err) {
        console.log(err);
      }
    });
  }

  makerBrand.name = name;
  makerBrand.image = image;
  makerBrand.displayOrder = displayOrder;
  makerBrand.makerId = makerId;
  await makerBrand.save();
  return responseSuccess(res, makerBrand, "Maker brand updated");
};

export const deleteMakerBrand = async (req: Request, res: Response) => {
  const { id } = req.params;
  const makerBrand = await MakerBrand.findByPk(id);
  if (!makerBrand) {
    return responseFailed(res, "Maker brand not found");
  }
  await makerBrand.destroy();
  return responseSuccess(res, null, "Maker brand deleted");
};

export const getMakerBrandProducts = async (req: Request, res: Response) => {
  const makerBrandProducts = await MakerBrand.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    order: [["displayOrder", "ASC"]],
    include: [
      {
        model: Product,
        as: "products",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        through: {
          attributes: [],
        },
      },
    ],
  });
  return responseSuccess(res, makerBrandProducts);
};

export const getMakerBrandProduct = async (req: Request, res: Response) => {
  const makerBrandProduct = await MakerBrand.findByPk(req.params.id, {
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [
      {
        model: Product,
        as: "products",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        through: {
          attributes: [],
        },
      },
    ],
  });
  return responseSuccess(res, makerBrandProduct);
};


