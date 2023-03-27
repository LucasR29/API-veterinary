import { UpdateResult } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Animals } from "../../entities/animals/animals.entity";
import { AppError } from "../../errors/appError";

export const deleteAnimalsService = async (
  animalID: string
): Promise<UpdateResult> => {
  const animalsRepository = AppDataSource.getRepository(Animals);

  const exist = await animalsRepository.findOneBy({ id: animalID });

  if (exist === null) {
    throw new AppError("Animal não existe", 400);
  }

  const deleted = await animalsRepository
    .createQueryBuilder()
    .softDelete()
    .where("id = :id", { id: animalID })
    .execute();

  return deleted;
};
