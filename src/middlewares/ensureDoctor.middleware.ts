import { AppDataSource } from "../data-source";
import { Request, Response, NextFunction } from "express";
import "dotenv/config";
import { Doctors } from "../entities/doctors/doctors.entity";

export const ensureDoctorMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const doctorRepository = AppDataSource.getRepository(Doctors);

  const doctor = await doctorRepository.exist({
    where: { id: req.user.id },
  });

  if (!doctor) {
    return res.status(403).json({ message: "You are not a Doctor" });
  }

  return next();
};
