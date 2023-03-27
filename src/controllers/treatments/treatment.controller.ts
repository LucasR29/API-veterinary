import { Request, Response } from "express";
import { createTreatmentService } from "../../services/treatment/createTreatment.service";
import { deleteTreatmentService } from "../../services/treatment/deleteTreatment.service";
import { updateTreatmentService } from "../../services/treatment/updateTreatment.service";
import { updateTreatmentProcedureService } from "../../services/treatment/updateTreatmentProcedure.service";

const createTreatmentController = async (
  request: Request,
  response: Response
) => {
  const data = request.body;
  const newTreatment = await createTreatmentService(data);
  return response.status(201).json(newTreatment);
};

const deleteTreatmentController = async (
  request: Request,
  response: Response
) => {
  const treatmentId: string = request.params.id;
  await deleteTreatmentService(treatmentId);
  return response.status(200).send();
};

const updateTreatmentProcedureController = async (
  request: Request,
  response: Response
) => {
  const data = request.body;
  const id: string = request.params.id;
  const newTreatment = await updateTreatmentProcedureService(id, data);
  return response.status(201).json(newTreatment);
};

const updatetreatmentController = async (
  request: Request,
  response: Response
) => {
  const data = request.body;
  const id: string = request.params.id;
  const newTreatment = await updateTreatmentService(id, data);
  return response.status(201).json(newTreatment);
};

export {
  createTreatmentController,
  deleteTreatmentController,
  updateTreatmentProcedureController,
  updatetreatmentController,
};
