import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";

export const validateSchemaMiddleware =
  (serializer: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = await serializer.validate(req.body, {
        stripUnknown: true,
        abortEarly: false,
      });

      const keys = Object.keys(validated);

      if (!(keys.length > 0)) {
        return res.status(401).json({ message: "Bad request" });
      }

      req.body = validated;

      return next();
    } catch (error: any) {
      return res.status(401).json({ message: error.errors });
    }
  };
