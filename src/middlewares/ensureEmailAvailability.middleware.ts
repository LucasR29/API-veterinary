import { Request, Response, NextFunction } from "express";
import "dotenv/config";
import { AppDataSource } from "../data-source";
import { Doctors } from "../entities/doctors/doctors.entity";
import { Users } from "../entities/users/users.entity";

export const ensureEmailAvailabilityMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  if (req.body.crmv) {
    const userRepository = AppDataSource.getRepository(Doctors);
    const userAlreadyExists = await userRepository.findOneBy({
      email: email,
    });

    if (userAlreadyExists) {
      return res
        .status(409)
        .json({ message: "This email adress is already being used" });
    }
    return next();
  }
  const userRepository = AppDataSource.getRepository(Users);

  const userAlreadyExists = await userRepository.findOne({
    where: {
      email: email,
    },
    withDeleted: true,
  });

  if (userAlreadyExists) {
    return res
      .status(409)
      .json({ message: "This email adress is already being used" });
  }
  return next();
};
