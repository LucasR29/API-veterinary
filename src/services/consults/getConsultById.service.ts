import { AppDataSource } from "../../data-source";
import { Consults } from "../../entities/consults/consults.entity";
import { AppError } from "../../errors/appError";
import { responseGetConsultsSchema } from "../../schemas/consults/consults.schema";

export const getConsultByIdService = async (id: string) => {
  const consultsRepository = AppDataSource.getRepository(Consults);
  const findConsult = await consultsRepository.findOne({
    where: { id: id },
    relations: {
      animal: {
        owner: true,
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

  if (!findConsult) {
    throw new AppError("Consult not found!", 404);
  }

  const validatedData = await responseGetConsultsSchema.validate(findConsult, {
    stripUnknown: true,
  });

  return validatedData;
};
