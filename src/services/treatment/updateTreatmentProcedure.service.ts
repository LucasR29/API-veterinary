import { AppDataSource } from "../../data-source";
import { ProcedureSchedule } from "../../entities/procedureSchedule/procedureSchedule.entity";

export const updateTreatmentProcedureService = async (
  procedureId: string,
  data: { date: string; hour: string }
) => {
  const proceduresScheduleRepository =
    AppDataSource.getRepository(ProcedureSchedule);
  const findScheduleProcedure = await proceduresScheduleRepository.findOneBy({
    id: procedureId,
  });

  await proceduresScheduleRepository.update({ id: procedureId }, { ...data });
  const updatedProcedure = Object.assign(findScheduleProcedure, data);

  return updatedProcedure;
};
