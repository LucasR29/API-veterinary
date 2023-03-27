import { AppDataSource } from "../../data-source";
import { Doctors } from "../../entities/doctors/doctors.entity";
import { getDoctorsSchema } from "../../schemas/doctors/doctors.schemas";

export const getDoctorsService = async () => {
  const doctorsRepo = AppDataSource.getRepository(Doctors);

  const doctors = await doctorsRepo.find({
    relations: {
      address: true,
    },
  });

  const doctorWithoutPassord = await getDoctorsSchema.validate(doctors, {
    stripUnknown: true,
  });

  return doctorWithoutPassord;
};
