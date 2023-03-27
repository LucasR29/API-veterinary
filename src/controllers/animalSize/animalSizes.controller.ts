import { Request, Response } from "express";
import { createAnimalSizeService } from "../../services/animalsSize/createAnimalsSize.service";
import { deleteAnimalSizeService } from "../../services/animalsSize/deleteAnimalsSize.service";
import { getAnimalSizeService } from "../../services/animalsSize/getAnimalsSize.service";

export const createAnimalSizeController = async (
  request: Request,
  response: Response
) => {
  const data = await createAnimalSizeService(request.body.size);

  return response.status(201).json(data);
};

export const deleteAnimalSizeController = async (
  request: Request,
  response: Response
) => {
  const data = await deleteAnimalSizeService(request.params.id);

  return response.status(200).json(data);
};

export const getAnimalSizeController = async (
  request: Request,
  response: Response
) => {
  const data = await getAnimalSizeService();

  return response.status(200).json(data);
};
