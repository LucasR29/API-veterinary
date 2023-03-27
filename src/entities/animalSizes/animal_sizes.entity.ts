import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Animals } from "../animals/animals.entity";

@Entity("animal_sizes")
export class AnimalSizes {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  size: string;

  @OneToMany(() => Animals, (animals) => animals.size)
  animals: Animals[];
}
