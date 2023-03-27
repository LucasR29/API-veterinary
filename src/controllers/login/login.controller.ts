import { Request, Response } from "express";
import { IUserRequest } from "../../interfaces/users.Interface";
import { createSessionService } from "../../services/login/createSession.service";

export const createSessionController = async (req: Request, res: Response) => {
  const sessionData: IUserRequest = req.body;
  const token = await createSessionService(sessionData);
  return res.json({ token });
};
