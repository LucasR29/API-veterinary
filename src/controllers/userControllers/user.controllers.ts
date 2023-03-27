import { Request, Response } from "express";
import { userCreateService } from "../../services/user/userCreate.service";
import { IUserRequest, IUserUpdate } from "../../interfaces/users.Interface";
import { getUserService } from "../../services/user/userGet.service";
import { updateUserService } from "../../services/user/userPatch.service";
import { deleteUserService } from "../../services/user/userDelete.service";

export const userCreateController = async (req: Request, res: Response) => {
  const userData: IUserRequest = req.body;
  const newUser = await userCreateService(userData);
  return res.status(201).json(newUser);
};

export const getUserController = async (
  request: Request,
  response: Response
) => {
  const doctors = await getUserService();

  return response.status(200).json(doctors);
};

export const updateUserController = async (
  request: Request,
  response: Response
) => {
  const userData: IUserUpdate = request.body;
  const updatedUser = await updateUserService(
    userData,
    request.params.id,
    request.user.id
  );

  return response.status(201).json(updatedUser);
};

export const deleteUserController = async (
  request: Request,
  response: Response
) => {
  const userId: string = request.params.id;
  const deletedUser = await deleteUserService(userId);

  return response.status(204).json(deletedUser);
};
