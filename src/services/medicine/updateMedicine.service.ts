import { AppDataSource } from "../../data-source";
import { Medicine } from "../../entities/medicines/medicines.enttity";
import { AppError } from "../../errors/appError";
import { IMedicineUpdate } from "../../interfaces/medicines";

export const updateMedicineService = async (
  medicineData: IMedicineUpdate,
  id: string
) => {
  const medicineRepository = AppDataSource.getRepository(Medicine);

  const medicine = await medicineRepository.findOneBy({
    id: id,
  });

  if (!medicine) {
    throw new AppError("Invalid id", 404);
  }

  const updatedmedicine = medicineRepository.create({
    ...medicine,
    ...medicineData,
  });

  await medicineRepository.save(updatedmedicine);

  return updatedmedicine;
};
