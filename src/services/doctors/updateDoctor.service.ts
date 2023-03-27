import { hashSync } from "bcryptjs";
import { AppDataSource } from "../../data-source";
import { Address } from "../../entities/address/address.entity";
import { Doctors } from "../../entities/doctors/doctors.entity";
import { AppError } from "../../errors/appError";
import { IDoctorUpdate } from "../../interfaces/doctor.interface";
import {
  doctorUpdateSchema,
  doctorWithoutPasswordSchema,
} from "../../schemas/doctors/doctors.schemas";

export const updateDoctorService = async (
  body: IDoctorUpdate,
  doctorID: string,
  loggedUserId: string
) => {
  const doctorRepo = AppDataSource.getRepository(Doctors);
  const addressRepo = AppDataSource.getRepository(Address);
  let address = {};

  const exist = await doctorRepo.exist({ where: { id: doctorID } });

  if (!exist) {
    throw new AppError("doctor not found", 404);
  }

  if (body.address) {
    if (!body.address.id) {
      throw new AppError("Imposible to update user addres without address id");
    }
    const addressFind = await addressRepo.findOneBy({ id: body.address.id });

    address = await addressRepo.save({ ...addressFind, ...body.address });

    delete body.address;
  }

  if (Object.keys(body).includes("email")) {
    const doctor = await doctorRepo.findOne({
      where: { email: body.email },
      withDeleted: true,
    });

    if (doctor !== null && doctor.id !== doctorID) {
      throw new AppError("email already on use", 409);
    }
  }

  if (Object.keys(body).includes("password")) {
    if (doctorID !== loggedUserId) {
      throw new AppError("You don't own this user, can't change password", 400);
    }
    body.password = hashSync(body.password, 10);
  }

  await doctorRepo.save({ id: doctorID, ...body });

  const userToreturn = await doctorRepo.findOne({
    where: { id: doctorID },
    relations: { address: true },
  });

  const doctorWithoutPassord = await doctorWithoutPasswordSchema.validate(
    userToreturn,
    {
      stripUnknown: true,
    }
  );

  return doctorWithoutPassord;
};
