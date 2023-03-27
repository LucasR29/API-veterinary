import { AppDataSource } from "../../data-source";
import { Animals } from "../../entities/animals/animals.entity";
import { getAnimalsSchema } from "../../schemas/animals/animals.schema";

export const getAnimalsService = async () => {
  const animalsRepo = AppDataSource.getRepository(Animals);

  const data = await animalsRepo.find({
    relations: {
      owner: true,
      size: true,
      type: true,
      vaccines_aplications: {
        medicines: true,
      },
    },
  });

  const animalReturn = await getAnimalsSchema.validate(data, {
    stripUnknown: true,
  });

  return animalReturn;
};
