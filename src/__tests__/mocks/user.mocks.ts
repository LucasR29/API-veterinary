import {
  IUserLogin,
  IUserRequest,
  IUserResponse,
} from "../../interfaces/users.Interface";

export const mockedUserRequest: IUserRequest = {
  name: "mockedName",
  email: "mockedEmaill@MediaList.com",
  password: "string",
  address: {
    district: "mockedDistrict",
    zipCode: "09807879",
    number: "320",
    complement: "ap 02 bl 01",
    street: "mockedStreet",
    city: "mockedCity",
    state: "PR",
  },
};

export const mockedUserRequestNoEmail: Omit<IUserRequest, "email"> = {
  name: "mockedName",
  password: "string",
  address: {
    district: "mockedDistrict",
    zipCode: "09807879",
    number: "320",
    complement: "ap 02 bl 01",
    street: "mockedStreet",
    city: "mockedCity",
    state: "PR",
  },
};

export const mockedUserResponse: IUserResponse = {
  name: "mockedName",
  email: "mockedEmail@MediaList.com",
  createdAt: new Date(),
  updatedAt: new Date(),
  address: {
    district: "mockedDistrict",
    zipCode: "09807879",
    number: "320",
    city: "mockedCity",
    state: "PR",
  },
};

export const mockedUserLogin: IUserLogin = {
  email: "mockedEmaill@MediaList.com",
  password: "string",
};
