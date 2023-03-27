import { Router } from "express";
import {
  deleteUserController,
  getUserController,
  updateUserController,
  userCreateController,
} from "../controllers/userControllers/user.controllers";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { regexUuidValidation } from "../middlewares/regexValidation.middleware";
import { userSchema } from "../schemas/users/users.schema";
const userRoutes = Router();

userRoutes.post(
  "",
  ensureDataIsValidMiddleware(userSchema),
  userCreateController
);

userRoutes.get("", ensureAuthMiddleware, getUserController);

userRoutes.patch(
  "/:id",
  regexUuidValidation,
  ensureAuthMiddleware,
  updateUserController
);

userRoutes.delete(
  "/:id",
  regexUuidValidation,
  ensureAuthMiddleware,
  deleteUserController
);

export default userRoutes;
