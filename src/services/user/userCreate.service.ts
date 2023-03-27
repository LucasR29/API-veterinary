import { Users } from "../../entities/users/users.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import { userWithoutPasswordSchema } from "../../schemas/users/users.schema";
import { IUserRequest } from "../../interfaces/users.Interface";
import { Address } from "../../entities/address/address.entity";
import { hashSync } from "bcryptjs";

export const userCreateService = async (userData: IUserRequest) => {
  const userRepository = AppDataSource.getRepository(Users);
  const addressRepository = AppDataSource.getRepository(Address);

  const exists = await userRepository.exist({
    where: { email: userData.email },
    withDeleted: true,
  });

  if (exists) {
    throw new AppError("Email already in use", 409);
  }

  const newAddress = addressRepository.create(userData.address);

  const address = await addressRepository.save(newAddress);

  const userCreated = userRepository.create(userData);

  userCreated.password = hashSync(userData.password, 10);

  const user = await userRepository.save({ ...userCreated, address });

  const userWithoutPassord = await userWithoutPasswordSchema.validate(user, {
    stripUnknown: true,
  });

  return userWithoutPassord;
};
