import { AppDataSource } from "../../data-source";
import { Animals } from "../../entities/animals/animals.entity";
import { AnimalSizes } from "../../entities/animalSizes/animal_sizes.entity";
import { Animal_types } from "../../entities/animalTypes/animalTypes.entity";
import { Medicine } from "../../entities/medicines/medicines.enttity";
import { Users } from "../../entities/users/users.entity";
import { VaccinesAplication } from "../../entities/vaccinesAplied/vaccinesAplied.entity";
import { AppError } from "../../errors/appError";
import { IAnimalsRequest } from "../../interfaces/animals";
import { createAnimalsResponseSchema } from "../../schemas/animals/animals.schema";

export const createAnimalsService = async (data: IAnimalsRequest) => {
  const vaccinesRepository = AppDataSource.getRepository(VaccinesAplication);
  const medicineRepository = AppDataSource.getRepository(Medicine);
  const sizeRepository = AppDataSource.getRepository(AnimalSizes);
  const typeRepository = AppDataSource.getRepository(Animal_types);
  const userRepository = AppDataSource.getRepository(Users);
  const animalsRepository = AppDataSource.getRepository(Animals);

  let owner = null;

  if (data.owner && data.owner.length > 10) {
    owner = await userRepository.findOneBy({ id: data.owner });
  }
  const size = await sizeRepository.findOneBy({ size: data.size });

  const type: any = await typeRepository.findOneBy({ type: data.type });

  if (size === null) {
    throw new AppError("size not registered", 400);
  }

  if (type === null) {
    throw new AppError("animal type not registered", 400);
  }

  const aplicationsData = await Promise.all(
    data.vaccines.map(async (vaccine) => {
      const medicine = await Promise.all(
        vaccine.id.map(async (id) => {
          const res = await medicineRepository.findOneBy({ id: id });
          if (res === null) {
            throw new AppError("vaccine " + id + " not found, check id", 404);
          }
          return res;
        })
      );
      if (medicine.length >= 1) {
        const res = { medicine: medicine, date_aplied: vaccine.date };
        return res;
      }
      return;
    })
  );

  const animal = await animalsRepository.save({
    ...data,
    size: size,
    type: type,
    owner: owner,
  });

  if (aplicationsData.includes(undefined)) {
    throw new AppError("cant send empyt ids array");
  }

  const aplications = await Promise.all(
    aplicationsData.map(async (aplication) => {
      const application = vaccinesRepository.create({
        medicines: aplication.medicine,
        date_aplied: aplication.date_aplied,
        animal: animal,
      });

      const res = await vaccinesRepository.save(application);

      return res;
    })
  );

  const vaccinatedAnimal = await animalsRepository.findOne({
    where: { id: animal.id },
    relations: ["owner", "type", "size"],
  });

  const newAnimal = await animalsRepository.save({
    ...vaccinatedAnimal,
    aplications,
  });

  const animalsValidated = await createAnimalsResponseSchema.validate(
    newAnimal,
    {
      stripUnknown: true,
    }
  );

  return animalsValidated;
};
