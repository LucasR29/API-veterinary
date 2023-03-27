import { IDoctorRequest } from "../../interfaces/doctor.interface";
import { IUserLogin, IUserResponse } from "../../interfaces/users.Interface";

export const mockedDoctorRequest: IDoctorRequest = {
  name: "mockedName",
  crmv: "65735283",
  email: "mockedDoctorEmail@MediaList.com",
  password: "string",
  address: {
    district: "mockedDistrict",
    zipCode: "09807879",
    number: "320",
    city: "mockedCity",
    state: "PR",
    street: "mockedStreet",
    complement: "ap 1201",
  },
};

export const mockedDoctorRequestCrmv: IDoctorRequest = {
  name: "mockedName",
  crmv: "65735283",
  email: "mockedDoctorEmailCrmv@MediaList.com",
  password: "string",
  address: {
    district: "mockedDistrict",
    zipCode: "09807879",
    number: "320",
    city: "mockedCity",
    state: "PR",
    street: "mockedStreet",
    complement: "ap 1201",
  },
};

export const mockedDoctorLogin: IUserLogin = {
  email: "mockedDoctorEmail@MediaList.com",
  password: "string",
};

export const mockedDoctorRequestWithoutCrmv: IDoctorRequest = {
  name: "mockedName",
  crmv: null,
  email: "mockedDoctorEmail@MediaList.com",
  password: "string",
  address: {
    district: "mockedDistrict",
    zipCode: "09807879",
    number: "320",
    city: "mockedCity",
    state: "PR",
    street: "mockedStreet",
    complement: "ap 1201",
  },
};
