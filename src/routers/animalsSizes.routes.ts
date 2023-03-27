import { Router } from "express";
import {
  createAnimalSizeController,
  deleteAnimalSizeController,
  getAnimalSizeController,
} from "../controllers/animalSize/animalSizes.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { ensureDoctorMiddleware } from "../middlewares/ensureDoctor.middleware";

export const animalSizesRoutes = Router();

animalSizesRoutes.get(
  "",
  ensureAuthMiddleware,
  ensureDoctorMiddleware,
  getAnimalSizeController
);
animalSizesRoutes.post(
  "",
  ensureAuthMiddleware,
  ensureDoctorMiddleware,
  createAnimalSizeController
);
animalSizesRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureDoctorMiddleware,
  deleteAnimalSizeController
);
