import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Animals } from "../animals/animals.entity";

@Entity("animal_types")
export class Animal_types {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  type: string;

  @OneToMany(() => Animals, (animals) => animals.type)
  animals: Animals[];
}
