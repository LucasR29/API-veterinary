import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import { AppDataSource } from "../../data-source";
import "dotenv/config";
import { AppError } from "../../errors/appError";
import { Users } from "../../entities/users/users.entity";
import { IUserRequest } from "../../interfaces/users.Interface";
import { Doctors } from "../../entities/doctors/doctors.entity";

export const createSessionService = async ({
  email,
  password,
}: IUserRequest): Promise<string> => {
  const userRepository = AppDataSource.getRepository(Users);

  const user = await userRepository.findOneBy({
    email: email,
  });

  if (user) {
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("User or password invalid", 403);
    }

    const token = jwt.sign(
      {
        email: email,
        id: user.id,
      },
      process.env.SECRET_KEY,
      {
        subject: user.id,
        expiresIn: process.env.EXPIRES_IN,
      }
    );
    return token;
  }

  const doctorRepository = AppDataSource.getRepository(Doctors);

  const doctor = await doctorRepository.findOneBy({
    email: email,
  });

  if (doctor) {
    const passwordMatch = await compare(password, doctor.password);

    if (!passwordMatch) {
      throw new AppError("User or password invalid", 403);
    }

    const token = jwt.sign(
      {
        email: email,
        crmv: doctor.crmv,
        id: doctor.id,
      },
      process.env.SECRET_KEY,
      {
        subject: doctor.id,
        expiresIn: process.env.EXPIRES_IN,
      }
    );

    return token;
  }

  if (!user || !doctor) {
    throw new AppError("User or password invalid", 403);
  }
};
