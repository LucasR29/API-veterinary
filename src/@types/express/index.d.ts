import { ICategoryRequest } from "../../interfaces/categories";
import { IPropertyRequest } from "../../interfaces/properties";
import { IScheduleRequest } from "../../interfaces/schedules";
import { IUserRequest } from "../../interfaces/users";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string
      };
      validatedBody: validatedData
    }
  }
}

export {};
