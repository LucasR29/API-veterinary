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
import { Animals } from "../animals/animals.entity";

@Entity("users")
export class Users {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 70 })
  name: string;

  @Column({ unique: true, length: 70, nullable: false })
  email: string;

  @Column({ length: 120 })
  password: string;

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

  @OneToMany(() => Animals, (animals) => animals.owner)
  animals: Animals[];
}
