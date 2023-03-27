import { AppDataSource } from "../../data-source";
import { Consults } from "../../entities/consults/consults.entity";
import { Procedure } from "../../entities/procedure/procedure.entity";
import { ProcedureSchedule } from "../../entities/procedureSchedule/procedureSchedule.entity";
import { Treatment } from "../../entities/treatment/treatment.entity";
import { AppError } from "../../errors/appError";

export const deleteTreatmentService = async (
  treatmentId: any
): Promise<void> => {
  const treatmentRepository = AppDataSource.getRepository(Treatment);
  const scheduleRepository = AppDataSource.getRepository(ProcedureSchedule);

  const findTreatment = await treatmentRepository.findOneBy({
    id: treatmentId,
  });

  const findSchedules = await scheduleRepository.find({
    where: {
      treatment: findTreatment,
    },
    relations: {
      treatment: true,
    },
  });

  findSchedules.forEach(async (schedule) => {
    schedule.treatment = null;

    await scheduleRepository.save(schedule);
  });

  if (!findTreatment) {
    throw new AppError("Treatment not found!", 404);
  }
  await treatmentRepository.delete(findTreatment);
};
