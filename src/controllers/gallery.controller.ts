import { Request, Response } from "express";
import { Gallery } from "../models/Gallery";
import { responseSuccess, responseFailed } from "../lib/helpers/response";

export const getGalleries = async (req: Request, res: Response) => {
  const galleries = await Gallery.findAll({
    attributes: ["id", "title", "image", "thumbnail", "type"],
    order: [["displayOrder", "ASC"]],
  });
  return responseSuccess(res, galleries);
};

export const getGallery = async (req: Request, res: Response) => {
  const gallery = await Gallery.findByPk(req.params.id, {
    attributes: ["id", "title", "image", "thumbnail", "type"],
  });
  return responseSuccess(res, gallery);
};

export const createGallery = async (req: Request, res: Response) => {
  let { title, image, thumbnail, type } = req.body;

  const files = req.files;
  if (files) {
    const imageFile = files?.image as any;
    image = imageFile.name;
    thumbnail = imageFile.name;

    imageFile?.mv(`public/images/galleries/${image}`, (err: any) => {
      if (err) {
        console.log(err);
      }
    });

    imageFile?.mv(
      `public/images/galleries/thumbnail/${thumbnail}`,
      (err: any) => {
        if (err) {
          console.log(err);
        }
      }
    );
  }

  const gallery = await Gallery.create({
    title,
    image,
    thumbnail,
    type,
  });
  return responseSuccess(res, gallery);
};

export const updateGallery = async (req: Request, res: Response) => {
  const { id } = req.params;
  let { title, image, thumbnail, type } = req.body;
  const gallery = await Gallery.findByPk(id);
  if (!gallery) {
    return responseFailed(res, "Gallery not found");
  }

  const files = req.files;
  if (files) {
    const imageFile = files?.image as any;
    image = imageFile.name;
    thumbnail = imageFile.name;

    imageFile?.mv(`public/images/galleries/${image}`, (err: any) => {
      if (err) {
        console.log(err);
      }
    });

    imageFile?.mv(
      `public/images/galleries/thumbnail/${thumbnail}`,
      (err: any) => {
        if (err) {
          console.log(err);
        }
      }
    );
  }

  await gallery.update({
    title,
    image,
    thumbnail,
    type,
  });
  return responseSuccess(res, gallery);
};

export const deleteGallery = async (req: Request, res: Response) => {
  const gallery = await Gallery.findByPk(req.params.id);
  if (!gallery) {
    return responseFailed(res, "Gallery not found");
  }
  await gallery.destroy();
  return responseSuccess(res, gallery);
};

