import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("address")
export class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 120, nullable: false })
  district: string;

  @Column({ length: 50, nullable: false })
  zipCode: string;

  @Column()
  number: string;

  @Column()
  street: string;

  @Column()
  complement: string;

  @Column({ length: 90, nullable: false })
  city: string;

  @Column({ length: 70, nullable: false })
  state: string;
}
