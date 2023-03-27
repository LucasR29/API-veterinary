import { Router } from "express";
import {
  clearAllAnimalVaccinesController,
  createAnimalsController,
  removeAnimalVaccineController,
} from "../controllers/animals/animals.controller";
import { deleteAnimalsController } from "../controllers/animals/animals.controller";
import { getAnimalsController } from "../controllers/animals/animals.controller";
import { patchAnimalsController } from "../controllers/animals/animals.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { ensureDoctorMiddleware } from "../middlewares/ensureDoctor.middleware";
import { ensureVaccinesAreUnique } from "../middlewares/ensureVaccinesAreUnique.middleware";
import { regexUuidValidation } from "../middlewares/regexValidation.middleware";
import { validateSchemaMiddleware } from "../middlewares/validadeschema.middleware";
import { createAnimalsSchema } from "../schemas/animals/animals.schema";

export const animalsRoute = Router();

animalsRoute.post(
  "",
  validateSchemaMiddleware(createAnimalsSchema),
  ensureVaccinesAreUnique,
  createAnimalsController
);

animalsRoute.get("", ensureAuthMiddleware, getAnimalsController);

animalsRoute.get("/:id", ensureAuthMiddleware, getAnimalsController);

animalsRoute.delete("/:id", regexUuidValidation, deleteAnimalsController);

animalsRoute.patch(
  "/:id",
  regexUuidValidation,
  validateSchemaMiddleware(createAnimalsSchema),
  ensureAuthMiddleware,
  ensureVaccinesAreUnique,
  patchAnimalsController
);

animalsRoute.delete(
  "/vaccines_clear/:id",
  regexUuidValidation,
  ensureAuthMiddleware,
  ensureDoctorMiddleware,
  clearAllAnimalVaccinesController
);

animalsRoute.delete(
  "/vaccine_remove/:id",
  regexUuidValidation,
  removeAnimalVaccineController
);
