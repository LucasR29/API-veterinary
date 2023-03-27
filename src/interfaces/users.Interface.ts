import { IAddressRequest, IAddressUpdate } from "./address.interface";

export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  address: IAddressRequest;
}

export interface IUserResponse {
  id?: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  address: object;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  password?: string;
  address?: IAddressUpdate;
}

export interface IOwnerResponse {
  address?: IAddressRequest;
  email: string;
  name: string;
  id: string;
}
