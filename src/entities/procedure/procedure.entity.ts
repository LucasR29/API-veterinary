import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("procedure")
export class Procedure {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 120, nullable: false })
  name: string;

  @Column({ length: 50, nullable: false })
  type: string;

  @Column()
  description: string;
}
