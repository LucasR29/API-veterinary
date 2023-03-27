import { AppDataSource } from "../../data-source";
import { Consults } from "../../entities/consults/consults.entity";
import { Doctors } from "../../entities/doctors/doctors.entity";
import { Medicine } from "../../entities/medicines/medicines.enttity";
import { Procedure } from "../../entities/procedure/procedure.entity";
import { ProcedureSchedule } from "../../entities/procedureSchedule/procedureSchedule.entity";
import { Treatment } from "../../entities/treatment/treatment.entity";
import { AppError } from "../../errors/appError";
import { responseCreateTreatmentSchema } from "../../schemas/treatment/treatment.schema";

export const createTreatmentService = async (data) => {
  const treatmentRepository = AppDataSource.getRepository(Treatment);
  const proceduresRepository = AppDataSource.getRepository(Procedure);
  const proceduresScheduleRepository =
    AppDataSource.getRepository(ProcedureSchedule);
  const medicineRepository = AppDataSource.getRepository(Medicine);
  const doctorRepository = AppDataSource.getRepository(Doctors);
  const consultRepository = AppDataSource.getRepository(Consults);

  const doctor = await doctorRepository.findOneBy({ id: data.doctor_id });

  if (!doctor) {
    throw new AppError("Doctor not found!", 404);
  }

  const consult = await consultRepository.findOneBy({ id: data.consult_id });

  if (!consult) {
    throw new AppError("Consult not found!", 404);
  }

  const createdProcedures = await Promise.all(
    data.procedures.map(async (index) => {
      const createProcedure = proceduresRepository.create(index);
      const newProcedure = await proceduresRepository.save(createProcedure);

      return newProcedure;
    })
  );

  const medicines = await Promise.all(
    data.medicines.map(async (medicineId: string) => {
      const findMedicine = await medicineRepository.findOneBy({
        id: medicineId,
      });
      if (!findMedicine) {
        throw new AppError("Medicine not found!", 404);
      }

      return findMedicine;
    })
  );

  const createTreatment = treatmentRepository.create({
    ...data,
    consults: consult,
    medicines: medicines,
  });

  const newTreatment = await treatmentRepository.save(createTreatment);

  const procedureSchedule = await Promise.all(
    data.procedures.map(async (procedure, index: number) => {
      const createProcedure = proceduresScheduleRepository.create({
        ...procedure,
        doctor: doctor,
        procedure: createdProcedures[index],
        treatment: newTreatment,
      });
      const res = await proceduresScheduleRepository.save(createProcedure);

      return res;
    })
  );

  const findProcedureSchedule = await proceduresScheduleRepository.find({
    where: { treatment: newTreatment },
    relations: { doctor: true, procedure: true },
  });

  const res = {
    ...newTreatment,
    procedures: findProcedureSchedule,
  };

  const validatedData = await responseCreateTreatmentSchema.validate(res, {
    stripUnknown: true,
  });

  return validatedData;
};
