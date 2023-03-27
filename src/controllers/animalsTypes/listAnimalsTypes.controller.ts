import { Request, Response } from "express";
import { animalsTypesCategoryService } from "../../services/animalsTypes/listAnimalsTypes.service";

export const listAnimalsTypesController = async (
  req: Request,
  res: Response
) => {
  const Types = await animalsTypesCategoryService();

  return res.status(201).json(Types);
};
