import { AppDataSource } from "../../data-source";
import { ProcedureSchedule } from "../../entities/procedureSchedule/procedureSchedule.entity";

export const listAllProcedureScheduleService = async () => {
  const procedureScheduleRepository =
    AppDataSource.getRepository(ProcedureSchedule);

  return await procedureScheduleRepository.find({
    relations: { procedure: true, treatment: true },
  });
};
