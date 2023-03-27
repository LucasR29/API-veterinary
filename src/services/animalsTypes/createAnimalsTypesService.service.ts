import { AppDataSource } from "../../data-source";
import { Animal_types } from "../../entities/animalTypes/animalTypes.entity";
import { AppError } from "../../errors/appError";
import { IAnimalsTypesRequest } from "../../interfaces/animalsTypes.interface";

export const createAnimalsTypesService = async (
  data: IAnimalsTypesRequest
): Promise<Animal_types> => {
  const animalsTypesRepository = AppDataSource.getRepository(Animal_types);

  const animalsTypesExist = await animalsTypesRepository.findOneBy({
    type: data.type,
  });

  if (animalsTypesExist) {
    throw new AppError("type already exist", 409);
  }

  const newAnimalType = animalsTypesRepository.create(data);

  await animalsTypesRepository.save(newAnimalType);

  return newAnimalType;
};
