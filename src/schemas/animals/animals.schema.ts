import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IAnimals,
  IAnimalsRequest,
  IAnimalsResponse,
} from "../../interfaces/animals";
import { IVaccinesAplications } from "../../interfaces/vaccines";
import { ICreateVaccines } from "../../interfaces/animals/index";

export const vaccinesAplicationsSchema: SchemaOf<IVaccinesAplications[]> = yup
  .array(
    yup
      .object({
        medicines: yup
          .array(
            yup
              .object({
                id: yup.string(),
                name: yup.string(),
                class: yup.string(),
                description: yup.string(),
              })
              .nullable()
          )
          .nullable(),
        date_aplied: yup.string().nullable(),
        id: yup.string().nullable(),
      })
      .nullable()
  )
  .nullable();

export const animalsSchema: SchemaOf<IAnimals> = yup.object().shape({
  vaccines_aplications: vaccinesAplicationsSchema.nullable(),
  last_visit: yup.date().required(),
  weigth: yup.string().nullable(),
  size: yup.object({ id: yup.string(), size: yup.string() }).nullable(),
  breed: yup.string().nullable(),
  type: yup.object({ id: yup.string(), type: yup.string() }).nullable(),
  birth_date: yup.date().nullable(),
  owner: yup
    .object({
      name: yup.string(),
      email: yup.string(),
      id: yup.string(),
    })
    .nullable(),
  name: yup.string().nullable(),
  id: yup.string().required(),
});

export const createAnimalsResponseSchema: SchemaOf<IAnimalsResponse> = yup
  .object()
  .shape({
    aplications: vaccinesAplicationsSchema.nullable(),
    last_visit: yup.date().required(),
    first_visit: yup.date().required(),
    weigth: yup.string().nullable(),
    size: yup.object({ id: yup.string(), size: yup.string() }).nullable(),
    breed: yup.string().nullable(),
    type: yup.object({ id: yup.string(), type: yup.string() }).nullable(),
    birth_date: yup.date().nullable(),
    owner: yup
      .object({
        name: yup.string(),
        email: yup.string(),
        id: yup.string(),
      })
      .nullable(),
    name: yup.string().nullable(),
    id: yup.string().required(),
  });

const vaccinesOnCreateAnimalsSchema: SchemaOf<ICreateVaccines[]> = yup.array(
  yup
    .object({
      date: yup.string().nullable(),
      id: yup.array(yup.string().nullable()).nullable(),
    })
    .nullable()
);

export const createAnimalsSchema: SchemaOf<IAnimalsRequest> = yup
  .object()
  .shape({
    vaccines: vaccinesOnCreateAnimalsSchema.nullable(),
    weight: yup.string().nullable(),
    size: yup.string().required(),
    breed: yup.string().nullable(),
    type: yup.string().required(),
    birth_date: yup.string().nullable(),
    owner: yup.string().nullable(),
    name: yup.string().nullable(),
  });

export const getAnimalsSchema: SchemaOf<IAnimals[]> = yup.array(animalsSchema);
