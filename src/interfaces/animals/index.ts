import { FindOperator } from "typeorm";
import { Users } from "../../entities/users/users.entity";
import { IVaccinesAplications, IVaccinesAplicationsGet } from "../vaccines";

export interface IAnimalsRequest {
  owner: string;
  name: string;
  birth_date: string;
  type: string;
  breed: string;
  weight: string;
  size: string;
  vaccines: [ICreateVaccines];
}

export interface IAnimalUpdate {
  owner?: any;
  name?: string;
  birth_date?: string;
  type?: any;
  breed?: string;
  weight?: string;
  size?: any;
  vaccines?: [ICreateVaccines];
}

export interface ICreateVaccines {
  id: Array<string>;
  date: string;
}

export interface IVaccinesRequest {
  name: string;
  class: string;
}
export interface IAnimalTypesRequest {
  type: string;
}

export interface IAnimalSizeRequest {
  size: string;
}

export interface IAnimalSizeResponse {
  id: string;
  size: string;
}

export interface IAnimalTypeResponse {
  id: string;
  type: string;
}

export interface IAnimalsResponse {
  aplications: IVaccinesAplications[];
  last_visit: Date;
  weigth: string;
  size: IAnimalSizeRequest;
  breed: string;
  type: IAnimalTypeResponse;
  birth_date: Date;
  owner: object;
  name: string;
  id: string;
}

export interface IAnimals {
  vaccines_aplications: IVaccinesAplications[];
  last_visit: Date;
  weigth: string;
  size: IAnimalSizeRequest;
  breed: string;
  type: IAnimalTypeResponse;
  birth_date: Date;
  owner: object;
  name: string;
  id: string;
}

export interface IAnimalsGet {
  vaccines_aplications: IVaccinesAplicationsGet[];
  last_visit: Date;
  weigth: string;
  size: IAnimalSizeRequest;
  breed: string;
  type: IAnimalTypeResponse;
  birth_date: Date;
  owner: object;
  name: string;
  id: string;
}
