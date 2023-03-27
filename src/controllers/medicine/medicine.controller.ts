import { Request, Response } from "express";
import { IMedicineRequest } from "../../interfaces/procedureSchedule";
import { createMedicineService } from "../../services/medicine/createMedicine.service";
import { deleteMedicineService } from "../../services/medicine/deleteMedicine.service";
import { listMedicineService } from "../../services/medicine/listMedicine.service";
import { updateMedicineService } from "../../services/medicine/updateMedicine.service";

const createMedicineController = async (req: Request, res: Response) => {
  const data: IMedicineRequest = req.body;
  const newProcedure = await createMedicineService(data);
  return res.status(201).json(newProcedure);
};

const listMedicineController = async (req: Request, res: Response) => {
  const medicineList = await listMedicineService();
  return res.status(200).json(medicineList);
};

const updateMedicineController = async (req: Request, res: Response) => {
  const updatedUser = await updateMedicineService(req.body, req.params.id);
  return res.status(200).json(updatedUser);
};

const deleteMedicineController = async (req: Request, res: Response) => {
  const deletedMedicine = await deleteMedicineService(req.params.id);
  return res.status(204).json(deletedMedicine);
};

export {
  createMedicineController,
  deleteMedicineController,
  updateMedicineController,
  listMedicineController,
};
