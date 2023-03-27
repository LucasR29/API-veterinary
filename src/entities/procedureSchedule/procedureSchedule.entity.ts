import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Doctors } from "../doctors/doctors.entity";
import { Procedure } from "../procedure/procedure.entity";
import { Treatment } from "../treatment/treatment.entity";

@Entity("procedure_schedule")
export class ProcedureSchedule {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "time" })
  hour: string;

  @OneToOne(() => Procedure)
  @JoinColumn()
  procedure: Procedure;

  @ManyToOne(() => Doctors, (doctors) => doctors.procedures_schedules)
  @JoinColumn()
  doctor: Doctors;

  @ManyToOne(() => Treatment, (treatment) => treatment.procedures, {
    nullable: true,
  })
  treatment: Treatment;
}
