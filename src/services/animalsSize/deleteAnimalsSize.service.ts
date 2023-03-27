import { AppDataSource } from "../../data-source";
import { AnimalSizes } from "../../entities/animalSizes/animal_sizes.entity";

export const deleteAnimalSizeService = async (animalSizeId: string) => {
  const animalSizeRepository = AppDataSource.getRepository(AnimalSizes);

  await animalSizeRepository
    .createQueryBuilder()
    .delete()
    .where({ id: animalSizeId })
    .execute();

  return;
};
