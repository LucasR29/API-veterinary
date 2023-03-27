import { AppDataSource } from "../../data-source";
import { Consults } from "../../entities/consults/consults.entity";
import { AppError } from "../../errors/appError";
import { responseGetAllConsultsSchema } from "../../schemas/consults/consults.schema";

export const listConsultService = async () => {
  const consultsRepository = AppDataSource.getRepository(Consults);
  const findConsults = await consultsRepository.find({
    relations: {
      animal: {
        owner: true,
        vaccines_aplications: true,
      },
      doctor: true,
      treatment: {
        medicines: true,
        procedures: {
          procedure: true,
        },
      },
    },
  });

  if (!findConsults.length) {
    throw new AppError("Consults not exists", 404);
  }

  const validatedData = await responseGetAllConsultsSchema.validate(
    findConsults,
    {
      stripUnknown: true,
    }
  );

  return validatedData;
};
