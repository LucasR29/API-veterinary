import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Doctors } from "../entities/doctors/doctors.entity";

const ensureDoctorExists = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const doctorsRepo = AppDataSource.getRepository(Doctors);
  const allDoctors = await doctorsRepo.find();
  const doctor = allDoctors.find((doctor) => doctor.id == request.params.id);
  if (!doctor) {
    return response.status(404).json({ message: "Doctor not found" });
  }
  return next();
};

export default ensureDoctorExists;
