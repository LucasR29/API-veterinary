import { Request, Response } from "express";
import { deleteProcedureService } from "../../services/procedure/deleteProcedure.service";
import { listAllProcedureService } from "../../services/procedure/listAllProcedure.service";

export const listAllProceduresController = async (
  req: Request,
  res: Response
) => {
  const data = await listAllProcedureService();

  return res.status(201).json(data);
};

export const deleteProceduresController = async (
  req: Request,
  res: Response
) => {
  const data = await deleteProcedureService(req.params.id);

  return res.status(201).send();
};
