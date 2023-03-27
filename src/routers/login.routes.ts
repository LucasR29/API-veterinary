import { createSessionController } from "../controllers/login/login.controller";

const { Router } = require("express");

const loginRoutes = Router();

loginRoutes.post("", createSessionController);

export default loginRoutes;
