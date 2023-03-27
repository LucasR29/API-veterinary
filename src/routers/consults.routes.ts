import { Router } from "express";
import {
  createConsultsController,
  deleteConsultsController,
  getConsultByIdController,
  listConsultsController,
  updateConsultsController,
} from "../controllers/consults/consults.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { validateSchemaMiddleware } from "../middlewares/validadeschema.middleware";
import {
  createConsultsSchema,
  updateConsultsSchema,
} from "../schemas/consults/consults.schema";

const consultsRoutes = Router();

//precisa do login, para confirmar a autenticação pelo token
consultsRoutes.post(
  "",
  ensureAuthMiddleware,
  validateSchemaMiddleware(createConsultsSchema),
  createConsultsController
);

//O :id é o id da consulta
consultsRoutes.delete("/:id", ensureAuthMiddleware, deleteConsultsController);

//O :id é o id da consulta
consultsRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  validateSchemaMiddleware(updateConsultsSchema),
  updateConsultsController
);

//O :id é o id da consulta
consultsRoutes.get("/:id", ensureAuthMiddleware, getConsultByIdController);

consultsRoutes.get("", ensureAuthMiddleware, listConsultsController);

export default consultsRoutes;
