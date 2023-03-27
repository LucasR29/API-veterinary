import { AppDataSource } from "../../data-source";
import { Animals } from "../../entities/animals/animals.entity";
import { animalsSchema } from "../../schemas/animals/animals.schema";

export const getAnimalByIdService = async (animalID: string) => {
  const animalsRepo = AppDataSource.getRepository(Animals);

  const data = await animalsRepo.findOne({
    where: { id: animalID },
    relations: {
      owner: true,
      size: true,
      type: true,
      vaccines_aplications: {
        medicines: true,
      },
    },
  });

  const animalReturn = await animalsSchema.validate(data, {
    stripUnknown: true,
  });

  return animalReturn;
};
