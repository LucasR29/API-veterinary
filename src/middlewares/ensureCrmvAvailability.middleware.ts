import { Request, Response, NextFunction } from "express";
import "dotenv/config";
import { AppDataSource } from "../data-source";
import { Doctors } from "../entities/doctors/doctors.entity";

export const ensureCrmvAvailabilityMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { crmv } = req.body;

  const userRepository = AppDataSource.getRepository(Doctors);

  const crmvAlreadyExists = await userRepository.findOneBy({
    crmv: crmv,
  });

  if (crmvAlreadyExists) {
    return res
      .status(409)
      .json({ message: "This crmv adress is already being used" });
  }
  next();
};
