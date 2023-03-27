import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IConsultRequest,
  IConsultResponse,
  IGetConsultResponse,
  IUpdateConsultResponse,
} from "../../interfaces/consults";
import { IDoctorResponse } from "../../interfaces/doctor.interface";
import { addressConsultsSchema, addressSchema } from "../address/addres.schema";
import { doctorWithoutPasswordSchema } from "../doctors/doctors.schemas";
import { userWithoutPasswordSchema } from "../users/users.schema";
import {
  animalsSchema,
  vaccinesAplicationsSchema,
} from "../animals/animals.schema";
import { IOwnerResponse } from "../../interfaces/users.Interface";
import { IAnimals, IAnimalsResponse } from "../../interfaces/animals";
import { IMedicineUpdate } from "../../interfaces/medicines";
import { IProcedureScheduleResponse } from "../../interfaces/procedureSchedule";

export const createConsultsSchema: SchemaOf<IConsultRequest> = yup
  .object()
  .shape({
    date: yup.string().required(),
    hour: yup.string().required(),
    doctor: yup.string().required(),
    animal: yup.string().required(),
  });

export const updateConsultsSchema: SchemaOf<IConsultRequest> = yup
  .object()
  .shape({
    date: yup.string().notRequired(),
    hour: yup.string().notRequired(),
    doctor: yup.string().notRequired(),
    animal: yup.string().notRequired(),
  });

const doctorConsultsSchema: SchemaOf<IDoctorResponse> = yup
  .object()
  .shape({
    crmv: yup.number().notRequired(),
    email: yup.string().email().notRequired(),
    name: yup.string().notRequired(),
    id: yup.string().notRequired(),
  })
  .notRequired();

const ownerSchema: SchemaOf<IOwnerResponse> = yup.object().shape({
  address: addressConsultsSchema.nullable(),
  email: yup.string().email(),
  name: yup.string(),
  id: yup.string(),
});

const animalConsultsSchema: SchemaOf<IAnimals> = yup.object().shape({
  owner: ownerSchema.nullable().notRequired(),
  breed: yup.string().nullable().notRequired(),
  type: yup
    .object()
    .nullable()
    .notRequired()
    .shape({ id: yup.string(), type: yup.string() }),
  size: yup
    .object()
    .nullable()
    .notRequired()
    .shape({ id: yup.string(), size: yup.string() }),
  last_visit: yup.date().notRequired(),
  weigth: yup.string().nullable().notRequired(),
  birth_date: yup.date().nullable().notRequired(),
  name: yup.string().nullable().notRequired(),
  id: yup.string().notRequired(),
  vaccines_aplications: vaccinesAplicationsSchema.nullable().notRequired(),
});

const medicineSchema: SchemaOf<IMedicineUpdate[]> = yup.array(
  yup.object({
    id: yup.string().nullable(),
    name: yup.string().nullable(),
    class: yup.string().nullable(),
    description: yup.string().nullable(),
  })
);

const procedureSchema: SchemaOf<IProcedureScheduleResponse[]> = yup.array(
  yup.object({
    procedure: yup.object({
      description: yup.string().nullable(),
      type: yup.string().nullable(),
      name: yup.string().nullable(),
      id: yup.string().nullable(),
    }),
    description: yup.string().nullable(),
    hour: yup.string().nullable(),
    date: yup.string().nullable(),
    id: yup.string().nullable(),
  })
);

const treatmentSchema = yup
  .object({
    medicines: medicineSchema,
    procedures: procedureSchema,
    description: yup.string().nullable(),
    name: yup.string().nullable(),
    id: yup.string().nullable(),
  })
  .nullable();

export const responseCreateConsultsSchema: SchemaOf<IConsultResponse> = yup
  .object()
  .shape({
    doctor: yup.object().notRequired().shape({
      crmv: yup.number().notRequired(),
      email: yup.string().email().notRequired(),
      name: yup.string().notRequired(),
      id: yup.string().notRequired(),
    }),
    animal: yup
      .object()
      .notRequired()
      .shape({
        owner: yup
          .object({
            name: yup.string(),
            email: yup.string(),
            id: yup.string(),
          })
          .nullable(),
        name: yup.string().nullable(),
        id: yup.string().required(),
      }),
    date: yup.string().notRequired(),
    hour: yup.string().notRequired(),
    id: yup.string(),
  });

export const responseGetAllConsultsSchema: SchemaOf<IGetConsultResponse[]> =
  yup.array(
    yup.object().shape({
      treatment: treatmentSchema,
      animal: animalConsultsSchema,
      medicines: medicineSchema,
      doctor: doctorConsultsSchema,
      hour: yup.string().notRequired(),
      date: yup.string().notRequired(),
      id: yup.string().notRequired(),
    })
  );

export const responseGetConsultsSchema: SchemaOf<IGetConsultResponse> = yup
  .object()
  .shape({
    treatment: treatmentSchema,
    medicines: medicineSchema,
    doctor: doctorConsultsSchema,
    animal: animalConsultsSchema,
    hour: yup.string().notRequired(),
    date: yup.string().notRequired(),
    id: yup.string().notRequired(),
  });

export const responseUpdateConsults: SchemaOf<IUpdateConsultResponse> = yup
  .object()
  .shape({
    medicines: medicineSchema,
    doctor: doctorConsultsSchema,
    animal: animalConsultsSchema,
    hour: yup.string().notRequired(),
    date: yup.string().notRequired(),
    id: yup.string().notRequired(),
  });
