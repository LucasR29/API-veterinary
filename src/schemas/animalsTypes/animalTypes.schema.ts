import * as yup from "yup";
import { SchemaOf } from "yup";
import { IAnimalsTypesRequest } from "../../interfaces/animalsTypes.interface";

export const animalsTypesSchema: SchemaOf<IAnimalsTypesRequest> = yup
  .object()
  .shape({
    type: yup.string().required(),
  });
