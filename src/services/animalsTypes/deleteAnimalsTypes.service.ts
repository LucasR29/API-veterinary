import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import { Animal_types } from "../../entities/animalTypes/animalTypes.entity";

export const deleteAnimalsTypeService = async (id: string): Promise<void> => {
  const Animal_TypesRepository = AppDataSource.getRepository(Animal_types);
  const findAnimalType = await Animal_TypesRepository.findOneBy({ id: id });
  if (!findAnimalType) {
    throw new AppError("Animal type not found", 404);
  }
  Animal_TypesRepository.remove(findAnimalType);
};
