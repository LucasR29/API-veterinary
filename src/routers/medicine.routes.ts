import { Router } from "express";
import {
  createMedicineController,
  deleteMedicineController,
  listMedicineController,
  updateMedicineController,
} from "../controllers/medicine/medicine.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { ensureDoctorMiddleware } from "../middlewares/ensureDoctor.middleware";
import { updateMedicineService } from "../services/medicine/updateMedicine.service";
const medicineRoutes = Router();

medicineRoutes.post(
  "",
  ensureAuthMiddleware,
  ensureDoctorMiddleware,
  createMedicineController
);
medicineRoutes.get(
  "",
  ensureAuthMiddleware,
  ensureDoctorMiddleware,
  listMedicineController
);
medicineRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureDoctorMiddleware,
  updateMedicineController
);
medicineRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureDoctorMiddleware,
  deleteMedicineController
);

export default medicineRoutes;
