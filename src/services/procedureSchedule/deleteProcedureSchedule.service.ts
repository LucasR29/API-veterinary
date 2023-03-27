import { AppDataSource } from "../../data-source";
import { ProcedureSchedule } from "../../entities/procedureSchedule/procedureSchedule.entity";
import { AppError } from "../../errors/appError";

export const deleteProcedureScheduleService = async (scheduleID: string) => {
  const procedureScheduleRepository =
    AppDataSource.getRepository(ProcedureSchedule);

  const exist = procedureScheduleRepository.exist({
    where: { id: scheduleID },
  });

  if (!exist) {
    throw new AppError("schedule not found", 404);
  }

  await procedureScheduleRepository
    .createQueryBuilder()
    .delete()
    .where("id = :id", { id: scheduleID })
    .execute();

  return;
};
