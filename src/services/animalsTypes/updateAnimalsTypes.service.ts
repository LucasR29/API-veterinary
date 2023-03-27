import { AppDataSource } from "../../data-source";
import { Animal_types } from "../../entities/animalTypes/animalTypes.entity";
import { AppError } from "../../errors/appError";
import { IAnimalsTypesRequest } from "../../interfaces/animalsTypes.interface";

export const updateAnimalsTypesService = async (
  data: IAnimalsTypesRequest,
  id: string
): Promise<Animal_types> => {
  const animalsTypesRepository = AppDataSource.getRepository(Animal_types);

  const animalsTypesExist = await animalsTypesRepository.findOneBy({
    type: data.type,
  });

  const findAnimalTypeID = await animalsTypesRepository.findOneBy({ id: id });

  if (animalsTypesRepository) {
    throw new AppError("Same type found", 404);
  }

  if (!findAnimalTypeID) {
    throw new AppError("Id not found", 404);
  }

  const updatedAnimalType = animalsTypesRepository.create(data);

  await animalsTypesRepository.save(updatedAnimalType);

  return updatedAnimalType;
};
