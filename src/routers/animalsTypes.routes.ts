import { Router } from "express";
import { createAnimalsTypesController } from "../controllers/animalsTypes/createAnimalsTypes.controller";
import { deleteAnimalsTypesController } from "../controllers/animalsTypes/deleteAnimalsTypes.controller";
import { listAnimalsTypesController } from "../controllers/animalsTypes/listAnimalsTypes.controller";
import { updateAnimalsTypesController } from "../controllers/animalsTypes/updateAnimalsTypes.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { ensureDoctorMiddleware } from "../middlewares/ensureDoctor.middleware";
import { validateSchemaMiddleware } from "../middlewares/validadeschema.middleware";
import { animalsTypesSchema } from "../schemas/animalsTypes/animalTypes.schema";

const animalTypesRoutes = Router();

animalTypesRoutes.post(
  "",
  ensureAuthMiddleware,
  validateSchemaMiddleware(animalsTypesSchema),
  ensureDoctorMiddleware,
  createAnimalsTypesController
);

//O :id é o id do type
animalTypesRoutes.patch(
  "/:id",
  validateSchemaMiddleware(animalsTypesSchema),
  ensureAuthMiddleware,
  ensureDoctorMiddleware,
  updateAnimalsTypesController
);

animalTypesRoutes.get(
  "",
  ensureAuthMiddleware,
  ensureDoctorMiddleware,
  listAnimalsTypesController
);

//O :id é o id do type
animalTypesRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureDoctorMiddleware,
  deleteAnimalsTypesController
);

export default animalTypesRoutes;
