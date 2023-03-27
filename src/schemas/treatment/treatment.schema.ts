import * as yup from "yup";

export const createTreatmentSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  doctor_id: yup.string().required(),
  consult_id: yup.string().required(),
  medicines: yup.array(yup.string()).required(),
  procedures: yup.array(
    yup
      .object()
      .shape({
        date: yup.string().required(),
        hour: yup.string().required(),
        name: yup.string(),
        type: yup.string(),
        description: yup.string(),
      })
      .required()
  ),
});

export const responseCreateTreatmentSchema = yup.object().shape({
  medicines: yup
    .array(
      yup.object().shape({
        id: yup.string().notRequired(),
        name: yup.string().notRequired(),
        class: yup.string().notRequired(),
        description: yup.string().notRequired(),
      })
    )
    .notRequired(),
  procedures: yup.array(
    yup
      .object()
      .shape({
        doctor: yup.object().shape({
          id: yup.string().notRequired(),
          name: yup.string().notRequired(),
          email: yup.string().email().notRequired(),
          crmv: yup.number().notRequired(),
          createdAt: yup.date().notRequired(),
          updatedAt: yup.date().notRequired(),
        }),
        procedure: yup
          .object()
          .shape({
            id: yup.string().notRequired(),
            name: yup.string().notRequired(),
            type: yup.string().notRequired(),
            description: yup.string().notRequired(),
          })
          .notRequired(),
        id: yup.string().notRequired(),
        date: yup.string().notRequired(),
        hour: yup.string().notRequired(),
      })
      .notRequired()
  ),
  consults: yup
    .object()
    .shape({
      id: yup.string().notRequired(),
      date: yup.string().notRequired(),
      hour: yup.string().notRequired(),
    })
    .notRequired(),
  description: yup.string().notRequired(),
  id: yup.string().notRequired(),
  name: yup.string().notRequired(),
});

export const updatetreatmentProcedureSchema = yup.object().shape({
  date: yup.string().notRequired(),
  hour: yup.string().notRequired(),
});
