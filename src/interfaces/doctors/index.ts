export interface IAddressRequest {
  district: string;
  zipCode: string;
  number: string;
  city: string;
  state: string;
  street: string;
  complement: string;
}

export interface IDoctorRequest {
  name: string;
  email: string;
  password: string;
  crmv: number;
  address: IAddressRequest;
}

export interface IDoctorResponse {
  delete_date?: string;
  updatedAt?: Date;
  createdAt?: Date;
  crmv?: number;
  email?: string;
  name?: string;
  id: string;
  address?: IAddressRequest;
}

export interface IDoctorUpdateRequest {
  delete_date?: string;
  updatedAt?: Date;
  createdAt?: Date;
  crmv?: number;
  email?: string;
  name?: string;
  id: string;
  address?: IAddressRequest;
  password?: string;
}
