import { IAddressRequest, IAddressUpdate } from "./address.interface";

interface IDoctorRequest {
  name: string;
  email: string;
  password: string;
  crmv: string;
  address: IAddressRequest;
}

interface IDoctorResponse {
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  address: object;
  crmv: number;
}

interface IDoctorUpdate {
  name?: string;
  email?: string;
  address?: IAddressUpdate;
  crmv?: number;
  password?: string;
}

export { IDoctorRequest, IDoctorResponse, IDoctorUpdate };
