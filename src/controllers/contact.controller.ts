import { Request, Response } from "express";
import { responseFailed, responseSuccess } from "../lib/helpers/response";
import { Contact } from "../models";

export const getContacts = async (req: Request, res: Response) => {
  const contacts = await Contact.findAll({
    attributes: [
      "id",
      "name",
      "surName",
      "mobile",
      "userIp",
      "subject",
      "message",
      "isReade",
    ],
    order: [["id", "DESC"]],
  });

  return responseSuccess(res, contacts);
};

export const getContact = async (req: Request, res: Response) => {
  const { id } = req.params;
  const contact = await Contact.findOne({
    attributes: [
      "id",
      "name",
      "surName",
      "mobile",
      "userIp",
      "subject",
      "message",
      "isReade",
    ],
    where: {
      id,
    },
  });

  if (!contact) {
    return responseFailed(res, "Contact not found");
  }

  return responseSuccess(res, contact);
};

export const createContact = async (req: Request, res: Response) => {
  let { name, surName, mobile, subject, message } = req.body;
  const userIp = req.ip;

  const contact = await Contact.create({
    name,
    surName,
    mobile,
    userIp,
    subject,
    message,
  });

  return responseSuccess(res, contact);
};

export const updateContact = async (req: Request, res: Response) => {
  const { id } = req.params;
  let { isReade } = req.body;

  const contact = await Contact.findByPk(id);

  if (!contact) {
    return responseFailed(res, "Contact not found");
  }

  contact.isReade = isReade;

  await contact.save();

  return responseSuccess(res, contact);
};

export const deleteContact = async (req: Request, res: Response) => {
  const { id } = req.params;

  const contact = await Contact.findByPk(id);

  if (!contact) {
    return responseFailed(res, "Contact not found");
  }

  await contact.destroy();

  return responseSuccess(res, contact);
};
