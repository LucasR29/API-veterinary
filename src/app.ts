import "express-async-errors";
import express from "express";
import doctorsRoutes from "./routers/doctors.routes";
import userRoutes from "./routers/user.routes";
import handleError from "./errors/handleError";
import { animalsRoute } from "./routers/animals.routes";
import medicineRoutes from "./routers/medicine.routes";
import consultsRoutes from "./routers/consults.routes";
import animalTypesRoutes from "./routers/animalsTypes.routes";
import loginRoutes from "./routers/login.routes";
import { animalSizesRoutes } from "./routers/animalsSizes.routes";

import treatmentRoutes from "./routers/treatment.routes";
import { proceduresRoutes } from "./routers/procedures.routes";
import { proceduresSchedulesRoutes } from "./routers/procedureSchedule.routes";

export const app = express();
app.use(express.json());

app.use("/doctors", doctorsRoutes);
app.use("/users", userRoutes);
app.use("/animals", animalsRoute);
app.use("/medicine", medicineRoutes);
app.use("/consults", consultsRoutes);
app.use("/animalTypes", animalTypesRoutes);
app.use("/login", loginRoutes);
app.use("/animalSizes", animalSizesRoutes);
app.use("/treatment", treatmentRoutes);
app.use("/procedures", proceduresRoutes);
app.use("/proceduresSchedules", proceduresSchedulesRoutes);

app.use(handleError);

export default app;
