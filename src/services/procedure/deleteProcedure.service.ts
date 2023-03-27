import { AppDataSource } from "../../data-source";
import { Procedure } from "../../entities/procedure/procedure.entity";
import { ProcedureSchedule } from "../../entities/procedureSchedule/procedureSchedule.entity";
import { AppError } from "../../errors/appError";

export const deleteProcedureService = async (procedureId: string) => {
  const procedureRepository = AppDataSource.getRepository(Procedure);
  const procedureScheduleRepository =
    AppDataSource.getRepository(ProcedureSchedule);

  const exist = await procedureRepository.findOne({
    where: { id: procedureId },
  });

  if (!exist) {
    throw new AppError("schedule not found", 404);
  }
  const schedule = await procedureScheduleRepository.findOne({
    where: { procedure: exist },
  });

  if (schedule !== null) {
    throw new AppError(
      "procedure scheduled, please delete schedule " + schedule.id,
      403
    );
  }

  await procedureRepository
    .createQueryBuilder()
    .delete()
    .where("id = :id", { id: procedureId })
    .execute();

  return;
};
