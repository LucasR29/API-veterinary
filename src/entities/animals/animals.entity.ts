import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  JoinColumn,
  OneToMany,
  ManyToOne,
  BeforeUpdate,
  DeleteDateColumn,
} from "typeorm";
import { AnimalSizes } from "../animalSizes/animal_sizes.entity";
import { Animal_types } from "../animalTypes/animalTypes.entity";
import { Consults } from "../consults/consults.entity";
import { Users } from "../users/users.entity";
import { VaccinesAplication } from "../vaccinesAplied/vaccinesAplied.entity";

@Entity("animals")
export class Animals {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 70 })
  name: string;

  @Column()
  weight: string;

  @ManyToOne(() => AnimalSizes, (animal_sizes) => animal_sizes.animals)
  size: AnimalSizes;

  @ManyToOne(() => Animal_types, (animal_types) => animal_types.animals)
  @JoinColumn()
  type: Animal_types;

  @Column({ type: "date" })
  birth_date: string;

  @Column()
  breed: string;

  @BeforeInsert()
  @CreateDateColumn({ type: "date" })
  first_visit: Date;

  @BeforeUpdate()
  @UpdateDateColumn({ type: "date" })
  last_visit: Date;

  @DeleteDateColumn({ type: "date" })
  delete_date: Date;

  @OneToMany(
    () => VaccinesAplication,
    (vaccines_aplied) => vaccines_aplied.animal
  )
  @JoinColumn()
  vaccines_aplications: VaccinesAplication[];

  @OneToMany(() => Consults, (consults) => consults.animal)
  @JoinColumn()
  consults: Consults[];

  @ManyToOne(() => Users, (users) => users.animals)
  @JoinColumn()
  owner: Users;
}
