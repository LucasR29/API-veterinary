import { AppDataSource } from "../../data-source";
import { Medicine } from "../../entities/medicines/medicines.enttity";
import { AppError } from "../../errors/appError";

export const deleteMedicineService = async (id: string): Promise<Medicine> => {
  const medicineRepository = AppDataSource.getRepository(Medicine);

  const medicine = await medicineRepository.findOneBy({
    id: id,
  });

  if (!medicine) {
    throw new AppError("Invalid id", 404);
  }

  await medicineRepository
    .createQueryBuilder("medicine")
    .delete()
    .where("id = :id", { id: id })
    .execute();

  return;
};
