import { AppDataSource } from "../../data-source";
import { Medicine } from "../../entities/medicines/medicines.enttity";

export const listMedicineService = async (): Promise<Medicine[]> => {
  const medicinerRepository = AppDataSource.getRepository(Medicine);

  const medicineList = await medicinerRepository.find();

  return medicineList;
};
