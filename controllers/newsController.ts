import { Request, Response } from "express";
import { News } from "../models/News";
import { responseSuccess, responseFailed } from "../lib/helpers/response";
import { NewsComment, NewsType } from "../models";

export const getNews = async (req: Request, res: Response) => {
  const news = await News.findAll({
    attributes: {
      exclude: ["updatedAt"],
    },
    order: [["displayOrder", "ASC"]],
    include: [
      {
        model: NewsType,
        attributes: {
          exclude: ["updatedAt"],
        },
      },
      {
        model: NewsComment,
        attributes: {
          exclude: ["updatedAt"],
        },
      },
    ],
  });
  return responseSuccess(res, news);
};

export const getNewsItem = async (req: Request, res: Response) => {
  const news = await News.findByPk(req.params.id, {
    attributes: {
      exclude: ["updatedAt"],
    },
    include: [
      {
        model: NewsType,
        attributes: {
          exclude: ["updatedAt"],
        },
      },
      {
        model: NewsComment,
        attributes: {
          exclude: ["updatedAt"],
        },
      },
    ],
  });
  return responseSuccess(res, news);
};

export const createNews = async (req: Request, res: Response) => {
  let {
    title,
    description,
    image,
    metaKeywords,
    metaDescription,
    metaTitle,
    newsTypeId,
    year,
    month,
    displayOrder,
    published,
    showOnHomePage,
  } = req.body;

  const files = req.files;
  if (files) {
    const imageFile = files?.image as any;
    image = imageFile.name;

    imageFile?.mv(`public/images/news/${image}`, (err: any) => {
      if (err) {
        console.log(err);
      }
    });
  }

  const news = await News.create({
    title,
    description,
    metaKeywords,
    metaDescription,
    metaTitle,
    newsTypeId,
    image,
    year,
    month,
    displayOrder,
    published,
    showOnHomePage,
  });
  return responseSuccess(res, news, "News created");
};

export const updateNews = async (req: Request, res: Response) => {
  const { id } = req.params;
  let {
    title,
    description,
    image,
    metaKeywords,
    metaDescription,
    metaTitle,
    newsTypeId,
    year,
    month,
    displayOrder,
    published,
    showOnHomePage,
  } = req.body;

  const files = req.files;
  if (files) {
    const imageFile = files?.image as any;
    image = imageFile.name;

    imageFile?.mv(`public/images/news/${image}`, (err: any) => {
      if (err) {
        console.log(err);
      }
    });
  }

  const news = await News.update(
    {
      title,
      description,
      metaKeywords,
      metaDescription,
      metaTitle,
      newsTypeId,
      image,
      year,
      month,
      displayOrder,
      published,
      showOnHomePage,
    },
    {
      where: {
        id,
      },
    }
  );
  return responseSuccess(res, news, "News updated");
};

export const deleteNews = async (req: Request, res: Response) => {
  const { id } = req.params;
  await News.destroy({
    where: {
      id,
    },
  });
  return responseSuccess(res, null, "News deleted");
};

export const getNewsTypes = async (req: Request, res: Response) => {
  const newsTypes = await NewsType.findAll({
    attributes: {
      exclude: ["updatedAt"],
    },
    order: [["displayOrder", "ASC"]],
  });
  return responseSuccess(res, newsTypes);
};

export const getNewsType = async (req: Request, res: Response) => {
  const newsType = await NewsType.findByPk(req.params.id, {
    attributes: {
      exclude: ["updatedAt"],
    },
  });
  return responseSuccess(res, newsType);
};

export const createNewsType = async (req: Request, res: Response) => {
  let {
    title,
    description,
    metaKeywords,
    metaDescription,
    metaTitle,
    image,
    displayOrder,
  } = req.body;

  const files = req.files;
  if (files) {
    const imageFile = files?.image as any;
    image = imageFile.name;

    imageFile?.mv(`public/images/news/newsType/${image}`, (err: any) => {
      if (err) {
        console.log(err);
      }
    });
  }

  const newsType = await NewsType.create({
    title,
    description,
    metaKeywords,
    metaDescription,
    metaTitle,
    image,
    displayOrder,
  });
  return responseSuccess(res, newsType, "News type created");
};

export const updateNewsType = async (req: Request, res: Response) => {
  const { id } = req.params;
  let {
    title,
    description,
    metaKeywords,
    metaDescription,
    metaTitle,
    image,
    displayOrder,
  } = req.body;

  const files = req.files;
  if (files) {
    const imageFile = files?.image as any;
    image = imageFile.name;

    imageFile?.mv(`public/images/news/newsType/${image}`, (err: any) => {
      if (err) {
        console.log(err);
      }
    });
  }

  const newsType = await NewsType.update(
    {
      title,
      description,
      metaKeywords,
      metaDescription,
      metaTitle,
      image,
      displayOrder,
    },
    {
      where: {
        id,
      },
    }
  );
  return responseSuccess(res, newsType, "News type updated");
};

export const deleteNewsType = async (req: Request, res: Response) => {
  const { id } = req.params;
  await NewsType.destroy({
    where: {
      id,
    },
  });
  return responseSuccess(res, null, "News type deleted");
};

export const getNewsComments = async (req: Request, res: Response) => {
  const newsComments = await NewsComment.findAll({
    attributes: {
      exclude: ["updatedAt"],
    },
    order: [["displayOrder", "ASC"]],
    include: [
      {
        model: News,
        as: "news",
        attributes: {
          exclude: ["updatedAt"],
        },
      },
    ],
  });
  return responseSuccess(res, newsComments);
};

export const getNewsComment = async (req: Request, res: Response) => {
  const newsComment = await NewsComment.findByPk(req.params.id, {
    attributes: {
      exclude: ["updatedAt"],
    },
    include: [
      {
        model: News,
        as: "news",
        attributes: {
          exclude: ["updatedAt"],
        },
      },
    ],
  });
  return responseSuccess(res, newsComment);
};

export const createNewsComment = async (req: Request, res: Response) => {
  let {
    name,
    email,
    comment,
    newsId,
    displayOrder,
    published,
    showOnHomePage,
    parentId,
  } = req.body;

  const newsComment = await NewsComment.create({
    name,
    email,
    comment,
    newsId,
    displayOrder,
    published,
    showOnHomePage,
    parentId,
  });
  return responseSuccess(res, newsComment, "News comment created");
};

export const updateNewsComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  let {
    name,
    email,
    comment,
    newsId,
    displayOrder,
    published,
    showOnHomePage,
    parentId,
  } = req.body;

  const newsComment = await NewsComment.update(
    {
      name,
      email,
      comment,
      newsId,
      displayOrder,
      published,
      showOnHomePage,
      parentId,
    },
    {
      where: {
        id,
      },
    }
  );
  return responseSuccess(res, newsComment, "News comment updated");
};

export const deleteNewsComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  await NewsComment.destroy({
    where: {
      id,
    },
  });
  return responseSuccess(res, null, "News comment deleted");
};

export const updateApprovedNewsComment = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { approved } = req.body;
  const newsComment = await NewsComment.update(
    {
      approved,
    },
    {
      where: {
        id,
      },
    }
  );
  return responseSuccess(res, newsComment, "News comment updated");
};
