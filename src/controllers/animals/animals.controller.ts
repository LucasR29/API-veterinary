import { Request, Response } from "express";
import { IAnimalsRequest } from "../../interfaces/animals";
import {
  clearAllAnimalVaccinesService,
  removeAnimalVaccineService,
} from "../../services/animals/clearAnimalVaccines.service";
import { createAnimalsService } from "../../services/animals/createAnimals.service";
import { deleteAnimalsService } from "../../services/animals/deleteAnimal.service";
import { getAnimalByIdService } from "../../services/animals/getAnimalById.service";
import { getAnimalsService } from "../../services/animals/getAnimals.service";
import { patchAnimalsService } from "../../services/animals/patchAnimals.service";

export const getAnimalsController = async (req: Request, res: Response) => {
  const data = req.params.id;
  let animalData = {};

  if (data) {
    animalData = await getAnimalByIdService(data);
  } else {
    animalData = await getAnimalsService();
  }

  return res.status(200).json(animalData);
};

export const createAnimalsController = async (req: Request, res: Response) => {
  const data: IAnimalsRequest = req.body;

  const animalData = await createAnimalsService(data);

  return res.status(201).json(animalData);
};

export const deleteAnimalsController = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  await deleteAnimalsService(id);

  return res.status(200).send();
};

export const patchAnimalsController = async (req: Request, res: Response) => {
  const data: IAnimalsRequest = req.body;
  const id: string = req.params.id;

  const newAnimalData = await patchAnimalsService(data, id);

  return res.status(200).json(newAnimalData);
};

export const clearAllAnimalVaccinesController = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;

  const newAnimalData = await clearAllAnimalVaccinesService(id);

  return res.status(200).json(newAnimalData);
};

export const removeAnimalVaccineController = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;

  await removeAnimalVaccineService(id, req.body.applications);

  return res.status(200).send();
};
