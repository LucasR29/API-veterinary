import { AppDataSource } from "../../data-source";
import { Animals } from "../../entities/animals/animals.entity";
import { VaccinesAplication } from "../../entities/vaccinesAplied/vaccinesAplied.entity";
import { AppError } from "../../errors/appError";

export const clearAllAnimalVaccinesService = async (animalID: string) => {
  const animalRepo = AppDataSource.getRepository(Animals);

  const animal = await animalRepo.findOneBy({ id: animalID });

  if (animal === null) {
    throw new AppError("Animal não encontrado", 404);
  }

  animal.vaccines_aplications = [];

  const resAnimal = await animalRepo.save(animal);

  return resAnimal;
};

export const removeAnimalVaccineService = async (
  animalID: string,
  vaccinesIDS: Array<string>
) => {
  const animalRepo = AppDataSource.getRepository(Animals);
  const vaccineRepo = AppDataSource.getRepository(VaccinesAplication);
  const vaccineQuery = vaccineRepo.createQueryBuilder();

  const animal = await animalRepo.findOneBy({ id: animalID });

  if (animal === null) {
    throw new AppError("Animal não encontrado", 404);
  }

  vaccinesIDS.forEach((x) => {
    vaccineQuery.delete().where("id = :id", { id: x }).execute();
  });

  return;
};
