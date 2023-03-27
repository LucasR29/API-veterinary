import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Animals } from "../animals/animals.entity";
import { Medicine } from "../medicines/medicines.enttity";

@Entity("vaccine_aplication")
export class VaccinesAplication {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToMany(() => Medicine)
  @JoinTable()
  medicines: Medicine[];

  @ManyToOne(() => Animals, (animals) => animals.vaccines_aplications)
  animal: Animals;

  @Column({ type: "date" })
  date_aplied: string;
}
