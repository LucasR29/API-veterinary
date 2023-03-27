import { AppDataSource } from "../../data-source";
import { Users } from "../../entities/users/users.entity";
import { getUsersSchema } from "../../schemas/users/users.schema";

export const getUserService = async () => {
  const usersRepo = AppDataSource.getRepository(Users);

  const users = await usersRepo.find({
    relations: {
      address: true,
    },
  });

  const usersWithoutPassord = await getUsersSchema.validate(users, {
    stripUnknown: true,
  });

  return usersWithoutPassord;
};
