import { Request, response, Response } from "express";
//import { instanceToPlain } from "class-transformer";
import { IDoctorUpdate } from "../../interfaces/doctor.interface";
import { IDoctorRequest } from "../../interfaces/doctors";
import { createDoctorService } from "../../services/doctors/createDoctor.service";
import { deleteDoctorService } from "../../services/doctors/deleteDoctors.service";
import { getDoctorsService } from "../../services/doctors/getDoctors.service";
import { updateDoctorService } from "../../services/doctors/updateDoctor.service";

const createDoctorController = async (request: Request, response: Response) => {
  const dataDoctor: IDoctorRequest = request.body;
  const newDoctor = await createDoctorService(dataDoctor);
  return response.status(201).json(newDoctor);
};
const getDoctorController = async (request: Request, response: Response) => {
  const doctors = await getDoctorsService();

  return response.status(200).json(doctors);
};

const updateDoctorController = async (request: Request, response: Response) => {
  const dataDoctor: IDoctorUpdate = request.body;
  const doctorId: string = request.params.id;
  const updatedDoctor = await updateDoctorService(
    dataDoctor,
    doctorId,
    request.user.id
  );
  return response.status(201).json(updatedDoctor);
};

const deleteDoctorController = async (request: Request, response: Response) => {
  const doctorId: string = request.params.id;
  const deletedDoctor = await deleteDoctorService(doctorId);

  return response.status(204).json(deletedDoctor);
};

export {
  createDoctorController,
  updateDoctorController,
  getDoctorController,
  deleteDoctorController,
};
