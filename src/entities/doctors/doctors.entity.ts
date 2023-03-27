import { hashSync } from "bcryptjs";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToOne,
  JoinColumn,
  OneToMany,
  BeforeUpdate,
  DeleteDateColumn,
} from "typeorm";
import { Address } from "../address/address.entity";
import { Consults } from "../consults/consults.entity";
import { ProcedureSchedule } from "../procedureSchedule/procedureSchedule.entity";

@Entity("doctors")
export class Doctors {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 70 })
  name: string;

  @Column({ unique: true, length: 70, nullable: false })
  email: string;

  @Column({ length: 120, nullable: false })
  password: string;

  @Column({ nullable: false })
  crmv: number;

  @BeforeInsert()
  @CreateDateColumn()
  createdAt: Date;

  @BeforeUpdate()
  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  delete_date: Date;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @OneToMany(
    () => ProcedureSchedule,
    (procedureSchedule) => procedureSchedule.doctor
  )
  procedures_schedules: ProcedureSchedule[];

  @OneToMany(() => Consults, (consults) => consults.doctor)
  @JoinColumn()
  consults: Consults[];
}
