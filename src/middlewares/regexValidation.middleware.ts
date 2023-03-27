import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";

export const regexUuidValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

  if (!regexExp.test(req.params.id)) {
    throw new AppError("invalid uuid", 400);
  }

  return next();
};
