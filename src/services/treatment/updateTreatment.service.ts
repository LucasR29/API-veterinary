import { AppDataSource } from "../../data-source";
import { Medicine } from "../../entities/medicines/medicines.enttity";
import { Treatment } from "../../entities/treatment/treatment.entity";
import { AppError } from "../../errors/appError";

export const updateTreatmentService = async (treatmentId: string, data) => {
  const treatmentRepository = AppDataSource.getRepository(Treatment);
  const medicineRepository = AppDataSource.getRepository(Medicine);

  let req = data;

  const findTreatment = await treatmentRepository.findOne({
    where: { id: treatmentId },
    relations: { medicines: true, procedures: true },
  });

  if (data.medicines) {
    const medicines = await Promise.all(
      data.medicines.map(async (medicineId: string, index: number) => {
        const findMedicine = await medicineRepository.findOneBy({
          id: medicineId,
        });
        if (!findMedicine) {
          throw new AppError("Medicine not found!", 404);
        }

        return findMedicine;
      })
    );

    const mergeMedicine = [...findTreatment.medicines, ...medicines];

    req = { ...req, medicines: mergeMedicine };
  }

  const updatedTreatment = Object.assign(findTreatment, req);

  const createTreatment = treatmentRepository.create({
    ...updatedTreatment,
  });

  const newTreatment = await treatmentRepository.save(createTreatment);

  return newTreatment;
};
