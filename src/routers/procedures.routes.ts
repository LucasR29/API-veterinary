import { Router } from "express";
import {
  deleteProceduresController,
  listAllProceduresController,
} from "../controllers/procedures/procedures.controllers";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { ensureDoctorMiddleware } from "../middlewares/ensureDoctor.middleware";

export const proceduresRoutes = Router();

proceduresRoutes.get(
  "",
  ensureAuthMiddleware,
  ensureDoctorMiddleware,
  listAllProceduresController
);

proceduresRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureDoctorMiddleware,
  deleteProceduresController
);
