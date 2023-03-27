import { Request, Response } from "express";
import { deleteProcedureService } from "../../services/procedure/deleteProcedure.service";
import { listAllProcedureService } from "../../services/procedure/listAllProcedure.service";
import { deleteProcedureScheduleService } from "../../services/procedureSchedule/deleteProcedureSchedule.service";
import { listAllProcedureScheduleService } from "../../services/procedureSchedule/listAllProcedureSchedule.service";

export const listAllProceduresSchedulesController = async (
  req: Request,
  res: Response
) => {
  const data = await listAllProcedureScheduleService();

  return res.status(201).json(data);
};

export const deleteProceduresSchedulesController = async (
  req: Request,
  res: Response
) => {
  const data = await deleteProcedureScheduleService(req.params.id);

  return res.status(201).send();
};
