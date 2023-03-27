import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("medicine")
export class Medicine {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 120, nullable: false })
  name: string;

  @Column({ length: 70, nullable: false })
  class: string;

  @Column()
  description: string;
}
