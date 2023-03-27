import { Router } from "express";
import { listAllProceduresSchedulesController } from "../controllers/proceduresSchedules/proceduresSchedule.controller";
import { deletePocedureScheduleController } from "../interfaces/procedureSchedule/procedureScheduleController";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { ensureDoctorMiddleware } from "../middlewares/ensureDoctor.middleware";

export const proceduresSchedulesRoutes = Router();

proceduresSchedulesRoutes.get(
  "",
  ensureAuthMiddleware,
  ensureDoctorMiddleware,
  listAllProceduresSchedulesController
);

proceduresSchedulesRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureDoctorMiddleware,
  deletePocedureScheduleController
);
