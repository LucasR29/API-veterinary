import { AppDataSource } from "../../data-source";
import { Doctors } from "../../entities/doctors/doctors.entity";
import { AppError } from "../../errors/appError";

export const deleteDoctorService = async (doctorID: string) => {
  const doctorsRepo = AppDataSource.getRepository(Doctors);

  const exist = await doctorsRepo.exist({
    where: { id: doctorID },
  });

  if (!exist) {
    throw new AppError("doctor not found", 404);
  }

  await doctorsRepo
    .createQueryBuilder()
    .softDelete()
    .where("id = :id", { id: doctorID })
    .execute();
};
