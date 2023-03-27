import { Request, Response } from "express";
import { IAnimalsTypesRequest } from "../../interfaces/animalsTypes.interface";
import { createAnimalsTypesService } from "../../services/animalsTypes/createAnimalsTypesService.service";

export const createAnimalsTypesController = async (
  req: Request,
  res: Response
) => {
  const data: IAnimalsTypesRequest = req.body;
  const newAnimals = await createAnimalsTypesService(data);

  return res.status(201).json(newAnimals);
};
