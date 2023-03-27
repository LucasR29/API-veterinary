import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IAddressRequest,
  IAddressUpdate,
} from "../../interfaces/address.interface";

export const addressSchema: SchemaOf<IAddressRequest> = yup.object().shape({
  zipCode: yup.string().required(),
  complement: yup.string().required(),
  state: yup.string().required(),
  district: yup.string().required(),
  city: yup.string().required(),
  number: yup.string().required(),
  street: yup.string().required(),
});

export const addressConsultsSchema: SchemaOf<IAddressRequest> = yup
  .object()
  .shape({
    zipCode: yup.string().nullable(),
    complement: yup.string().nullable(),
    state: yup.string().nullable(),
    district: yup.string().nullable(),
    city: yup.string().nullable(),
    number: yup.string().nullable(),
    street: yup.string().nullable(),
  });

export const addressResponseSchema: SchemaOf<IAddressUpdate> = yup
  .object()
  .shape({
    zipCode: yup.string().nullable(),
    complement: yup.string().nullable(),
    state: yup.string().nullable(),
    district: yup.string().nullable(),
    city: yup.string().nullable(),
    number: yup.string().nullable(),
    street: yup.string().nullable(),
    id: yup.string().nullable(),
  });
