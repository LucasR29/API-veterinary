import { Request, Response } from "express";
import { deleteProcedureScheduleService } from "../../services/procedureSchedule/deleteProcedureSchedule.service";

export const deletePocedureScheduleController = async (
  request: Request,
  response: Response
) => {
  await deleteProcedureScheduleService(request.params.id);

  return response.status(200).send();
};
