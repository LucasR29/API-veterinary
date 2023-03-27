import { AppDataSource } from "../../data-source";
import { Animals } from "../../entities/animals/animals.entity";
import { Consults } from "../../entities/consults/consults.entity";
import { Doctors } from "../../entities/doctors/doctors.entity";
import { AppError } from "../../errors/appError";
import { responseCreateConsultsSchema } from "../../schemas/consults/consults.schema";

export const createConsultsService = async (consultsData) => {
  const consultsRepository = AppDataSource.getRepository(Consults);
  const doctorsRepository = AppDataSource.getRepository(Doctors);
  const animalRepository = AppDataSource.getRepository(Animals);

  const doctor = await doctorsRepository.findOneBy({
    id: consultsData.doctor,
  });

  if (!doctor) {
    throw new AppError("Doctor not found", 404);
  }

  const animal = await animalRepository.findOneBy({
    id: consultsData.animal,
  });

  if (!animal) {
    throw new AppError("Animal not found", 404);
  }

  const createConsults = consultsRepository.create(consultsData);

  const newConsults = await consultsRepository.save({
    ...createConsults,
    animal: animal,
    doctor: doctor,
  });

  const validatedData = await responseCreateConsultsSchema.validate(
    newConsults,
    {
      stripUnknown: true,
    }
  );
  return validatedData;
};
