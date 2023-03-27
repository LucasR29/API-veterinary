import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IDoctorRequest,
  IDoctorResponse,
  IDoctorUpdateRequest,
} from "../../interfaces/doctors";

export const doctorSchema: SchemaOf<IDoctorRequest> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  crmv: yup.number().notRequired(),
  address: yup
    .object()
    .required()
    .shape({
      district: yup.string(),
      zipCode: yup.string().max(8),
      number: yup.string().notRequired(),
      city: yup.string(),
      state: yup.string().max(2),
      street: yup.string().required(),
      complement: yup.string().required(),
    }),
});

export const doctorWithoutPasswordSchema: SchemaOf<IDoctorResponse> = yup
  .object()
  .shape({
    address: yup
      .object()
      .notRequired()
      .shape({
        zipCode: yup.string().max(8).notRequired(),
        state: yup.string().max(2).notRequired(),
        city: yup.string().notRequired(),
        complement: yup.string().notRequired(),
        district: yup.string().notRequired(),
        number: yup.string().notRequired(),
        street: yup.string().notRequired(),
        id: yup.string(),
      }),
    delete_date: yup.string().nullable(),
    updatedAt: yup.date().notRequired(),
    createdAt: yup.date().notRequired(),
    crmv: yup.number().notRequired(),
    email: yup.string().email().notRequired(),
    name: yup.string().notRequired(),
    id: yup.string().notRequired(),
  });

export const doctorUpdateSchema: SchemaOf<IDoctorUpdateRequest> = yup
  .object()
  .shape({
    address: yup
      .object({
        zipCode: yup.string().nullable(),
        complement: yup.string().nullable(),
        number: yup.string().nullable(),
        street: yup.string().nullable(),
        district: yup.string().nullable(),
        city: yup.string().nullable(),
        state: yup.string().max(2).nullable(),
        id: yup.string().nullable(),
      })
      .nullable(),
    delete_date: yup.string().nullable(),
    updatedAt: yup.date().notRequired(),
    createdAt: yup.date().notRequired(),
    email: yup.string().email().notRequired(),
    password: yup.string().notRequired(),
    name: yup.string().notRequired(),
    crmv: yup.number().notRequired(),
    id: yup.string().notRequired(),
  });

export const getDoctorsSchema: SchemaOf<IDoctorResponse[]> = yup.array(
  doctorWithoutPasswordSchema
);
