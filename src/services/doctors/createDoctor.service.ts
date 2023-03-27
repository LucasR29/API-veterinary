import { hashSync } from "bcryptjs";
import { AppDataSource } from "../../data-source";
import { Address } from "../../entities/address/address.entity";
import { Doctors } from "../../entities/doctors/doctors.entity";
import { IDoctorRequest } from "../../interfaces/doctors";
import { doctorWithoutPasswordSchema } from "../../schemas/doctors/doctors.schemas";

export const createDoctorService = async (doctorData: IDoctorRequest) => {
  const doctorRepository = AppDataSource.getRepository(Doctors);

  const addressRepository = AppDataSource.getRepository(Address);

  const address = addressRepository.create(doctorData.address);

  await addressRepository.save(address);

  const doctor = doctorRepository.create(doctorData);

  doctor.password = hashSync(doctorData.password, 10);

  const newDoctor = await doctorRepository.save({
    ...doctor,
    address: address,
  });

  const doctorWithoutPassord = await doctorWithoutPasswordSchema.validate(
    newDoctor,
    {
      stripUnknown: true,
    }
  );

  return doctorWithoutPassord;
};
