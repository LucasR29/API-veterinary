import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserRequest } from "../../interfaces/users.Interface";
import { addressResponseSchema, addressSchema } from "../address/addres.schema";

export const userSchema: SchemaOf<IUserRequest> = yup.object().shape({
  name: yup.string().required().max(70),
  email: yup.string().email().required().max(70),
  password: yup.string().required().max(120),
  address: addressSchema,
});

export const userWithoutPasswordSchema = yup.object().shape({
  address: addressResponseSchema,
  updatedAt: yup.date().notRequired(),
  createdAt: yup.date().notRequired(),
  email: yup.string().email().notRequired(),
  name: yup.string().notRequired(),
  id: yup.string().notRequired(),
});

export const userUpdateSchema = yup.object().shape({
  address: addressResponseSchema,
  delete_date: yup.string().nullable(),
  updatedAt: yup.date().notRequired(),
  createdAt: yup.date().notRequired(),
  email: yup.string().email().notRequired(),
  name: yup.string().notRequired(),
  id: yup.string().notRequired(),
});

export const getUsersSchema = yup.array(userWithoutPasswordSchema);
