import { Request, Response } from "express";
import { deleteAnimalsTypeService } from "../../services/animalsTypes/deleteAnimalsTypes.service";

export const deleteAnimalsTypesController = async (
  req: Request,
  res: Response
) => {
  const id: string = req.params.id;
  await deleteAnimalsTypeService(id);

  return res.status(204).json({});
};
