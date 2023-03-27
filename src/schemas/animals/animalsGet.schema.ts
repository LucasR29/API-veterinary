import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IAnimals,
  IAnimalsGet,
  IAnimalsRequest,
  IAnimalsResponse,
} from "../../interfaces/animals";
import {
  IVaccinesAplications,
  IVaccinesAplicationsGet,
} from "../../interfaces/vaccines";
import { ICreateVaccines } from "../../interfaces/animals/index";

export const vaccinesAplicationsSchemaGet: SchemaOf<IVaccinesAplicationsGet[]> =
  yup
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

export const animalsSchemaGet: SchemaOf<IAnimalsGet> = yup.object().shape({
  vaccines_aplications: vaccinesAplicationsSchemaGet.nullable(),
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

export const getAnimalsSchema: SchemaOf<IAnimalsGet[]> =
  yup.array(animalsSchemaGet);
