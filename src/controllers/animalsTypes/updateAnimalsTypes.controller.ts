import { Request, Response } from "express";
import { IAnimalsTypesRequest } from "../../interfaces/animalsTypes.interface";
import { updateAnimalsTypesService } from "../../services/animalsTypes/updateAnimalsTypes.service";

export const updateAnimalsTypesController = async (
  req: Request,
  res: Response
) => {
  const data: IAnimalsTypesRequest = req.body;
  const id: string = req.params.id;
  const patchType = await updateAnimalsTypesService(data, id);

  return res.status(201).json(patchType);
};
