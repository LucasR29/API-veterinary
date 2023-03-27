import { Router } from "express";
import {
  createTreatmentController,
  deleteTreatmentController,
  updatetreatmentController,
  updateTreatmentProcedureController,
} from "../controllers/treatments/treatment.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { ensureDoctorMiddleware } from "../middlewares/ensureDoctor.middleware";
import { createTreatmentSchema } from "../schemas/treatment/treatment.schema";

const treatmentRoutes = Router();

treatmentRoutes.post(
  "",
  ensureAuthMiddleware,
  ensureDoctorMiddleware,
  ensureDataIsValidMiddleware(createTreatmentSchema),
  createTreatmentController
);

treatmentRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureDoctorMiddleware,
  deleteTreatmentController
);

treatmentRoutes.patch(
  "/procedureSchedule/:id",
  ensureAuthMiddleware,
  ensureDoctorMiddleware,
  updateTreatmentProcedureController
);

treatmentRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureDoctorMiddleware,
  updatetreatmentController
);

export default treatmentRoutes;
