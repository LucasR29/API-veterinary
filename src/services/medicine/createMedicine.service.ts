import { AppDataSource } from "../../data-source";
import { Medicine } from "../../entities/medicines/medicines.enttity";
import { IMedicineRequest } from "../../interfaces/procedureSchedule";

export const createMedicineService = async (
  data: IMedicineRequest
): Promise<Medicine> => {
  const medicineRepository = AppDataSource.getRepository(Medicine);

  const newMedicine = medicineRepository.create(data);

  await medicineRepository.save(newMedicine);

  return newMedicine;
};
