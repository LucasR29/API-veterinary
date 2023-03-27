import { AppDataSource } from "../../data-source";
import { Procedure } from "../../entities/procedure/procedure.entity";

export const listAllProcedureService = async () => {
  const procedureRepository = AppDataSource.getRepository(Procedure);

  return await procedureRepository.find();
};
