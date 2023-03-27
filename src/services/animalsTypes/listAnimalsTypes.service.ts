import { IAnimalsTypesRequest } from "../../interfaces/animalsTypes.interface";
import { Animal_types } from "../../entities/animalTypes/animalTypes.entity";
import { AppDataSource } from "../../data-source";

export const animalsTypesCategoryService = async (): Promise<
  IAnimalsTypesRequest[]
> => {
  const animals_TypesRepository = AppDataSource.getRepository(Animal_types);

  const types = await animals_TypesRepository.find();

  return types;
};
