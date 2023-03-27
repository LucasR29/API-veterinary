import { AppDataSource } from "../../data-source";
import { AnimalSizes } from "../../entities/animalSizes/animal_sizes.entity";

export const getAnimalSizeService = async () => {
  const animalSizeRepo = AppDataSource.getRepository(AnimalSizes);

  return await animalSizeRepo.find();
};
