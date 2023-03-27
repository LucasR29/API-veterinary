import { Request, Response } from "express";
import { IConsultRequest } from "../../interfaces/consults/index";
import { createConsultsService } from "../../services/consults/createConsults.service";
import { deleteConsultsService } from "../../services/consults/deleteConsults.service";
import { getConsultByIdService } from "../../services/consults/getConsultById.service";
import { listConsultService } from "../../services/consults/listConsults.service";
import { updateConsultsService } from "../../services/consults/updateConsults.service";

const createConsultsController = async (
  request: Request,
  response: Response
) => {
  const consultsData: IConsultRequest = request.body;
  const newConsults = await createConsultsService(consultsData);
  return response.status(201).json(newConsults);
};

const updateConsultsController = async (
  request: Request,
  response: Response
) => {
  const id: string = request.params.id;
  const data: IConsultRequest = request.body;
  const updatedConsults = await updateConsultsService(data, id);
  return response.status(200).json(updatedConsults);
};

const deleteConsultsController = async (
  request: Request,
  response: Response
) => {
  const id: string = request.params.id;
  await deleteConsultsService(id);
  return response.status(204).json({});
};

const getConsultByIdController = async (
  request: Request,
  response: Response
) => {
  const id: string = request.params.id;
  const consult = await getConsultByIdService(id);
  return response.status(200).json(consult);
};

const listConsultsController = async (request: Request, response: Response) => {
  const list = await listConsultService();
  return response.status(200).json(list);
};

export {
  createConsultsController,
  deleteConsultsController,
  updateConsultsController,
  getConsultByIdController,
  listConsultsController,
};
