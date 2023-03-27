import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";

export const ensureVaccinesAreUnique = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vaccines = req.body.vaccines;

  if (vaccines != null && vaccines.length >= 1) {
    vaccines.forEach((application: { id: string; date: string }) => {
      const arrayIDS = application.id;

      const setIDS = [...new Set(arrayIDS)];

      if (arrayIDS.length != setIDS.length) {
        throw new AppError(
          "Impossible to apply the same vaccine on the same day"
        );
      }
    });
  }

  return next();
};
