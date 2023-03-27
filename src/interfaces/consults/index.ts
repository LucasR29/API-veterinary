import { IAnimals } from "../animals";
import { IDoctorResponse } from "../doctors";
import { IMedicineUpdate } from "../medicines";

export interface IConsultUpdate {
  date?: string;
  hour?: string;
  animal?: string;
  doctor?: string;
}

export interface IConsultRequest {
  date?: string;
  hour?: string;
  animal?: string;
  doctor?: string;
}

export interface IConsultResponse {
  date: string;
  hour: string;
  doctor: object;
  animal: object;
  id: string;
}

export interface IGetConsultResponse {
  treatment: object;
  medicines: IMedicineUpdate[];
  doctor: object;
  animal: IAnimals;
  hour: string;
  date: string;
  id: string;
}

export interface IUpdateConsultResponse {
  medicines: IMedicineUpdate[];
  doctor: object;
  animal: IAnimals;
  hour: string;
  date: string;
  id: string;
}
