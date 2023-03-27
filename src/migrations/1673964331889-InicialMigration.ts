import { MigrationInterface, QueryRunner } from "typeorm";

export class InicialMigration1673964331889 implements MigrationInterface {
    name = 'InicialMigration1673964331889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "district" character varying(120) NOT NULL, "zipCode" character varying(50) NOT NULL, "number" character varying NOT NULL, "street" character varying NOT NULL, "complement" character varying NOT NULL, "city" character varying(90) NOT NULL, "state" character varying(70) NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "animal_sizes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "size" character varying NOT NULL, CONSTRAINT "PK_63924e6e85049183369f780a082" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "animal_types" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying NOT NULL, CONSTRAINT "PK_c4dd2b1389ccbade422c3d9a2f4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "procedure" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(120) NOT NULL, "type" character varying(50) NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_9888785b528492e7539d96e3894" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "medicine" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(120) NOT NULL, "class" character varying(70) NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_b9e0e6f37b7cadb5f402390928b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "treatment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(120) NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_5ed256f72665dee35f8e47b416e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "procedure_schedule" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "hour" TIME NOT NULL, "procedureId" uuid, "doctorId" uuid, "treatmentId" uuid, CONSTRAINT "REL_f78fb1b64fa9f1d0a2225b3d7d" UNIQUE ("procedureId"), CONSTRAINT "PK_ab84a0050996c4e2ca2734f39cf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "doctors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(70) NOT NULL, "email" character varying(70) NOT NULL, "password" character varying(120) NOT NULL, "crmv" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "delete_date" TIMESTAMP, "addressId" uuid, CONSTRAINT "UQ_62069f52ebba471c91de5d59d61" UNIQUE ("email"), CONSTRAINT "REL_ad816aa66aa42fad408b1b7d76" UNIQUE ("addressId"), CONSTRAINT "PK_8207e7889b50ee3695c2b8154ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "consults" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "hour" TIME NOT NULL, "animalId" uuid, "doctorId" uuid, "treatmentId" uuid, CONSTRAINT "REL_5dec29de0a7363eefad6f3fa7a" UNIQUE ("treatmentId"), CONSTRAINT "PK_f1dfb48f1617b7b774fd4da7a97" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(70) NOT NULL, "email" character varying(70) NOT NULL, "password" character varying(120) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "delete_date" TIMESTAMP, "addressId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_bafb08f60d7857f4670c172a6e" UNIQUE ("addressId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vaccine_aplication" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date_aplied" date NOT NULL, "animalId" uuid, CONSTRAINT "PK_344a0dc2ec6727810158fa26421" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "animals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(70) NOT NULL, "weight" character varying NOT NULL, "birth_date" date NOT NULL, "breed" character varying NOT NULL, "first_visit" date NOT NULL DEFAULT now(), "last_visit" date NOT NULL DEFAULT now(), "delete_date" date, "sizeId" uuid, "typeId" uuid, "ownerId" uuid, CONSTRAINT "PK_6154c334bbb19186788468bce5c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "treatment_medicines_medicine" ("treatmentId" uuid NOT NULL, "medicineId" uuid NOT NULL, CONSTRAINT "PK_b152f80fbd1b2a41dacf7f2519f" PRIMARY KEY ("treatmentId", "medicineId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_af5c67107ebabc61e96cd88098" ON "treatment_medicines_medicine" ("treatmentId") `);
        await queryRunner.query(`CREATE INDEX "IDX_484ed36e0ea48b584e8677ac46" ON "treatment_medicines_medicine" ("medicineId") `);
        await queryRunner.query(`CREATE TABLE "vaccine_aplication_medicines_medicine" ("vaccineAplicationId" uuid NOT NULL, "medicineId" uuid NOT NULL, CONSTRAINT "PK_77efc36b14119aeab855a805f6f" PRIMARY KEY ("vaccineAplicationId", "medicineId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_be714de7af315fd04b961bd0c5" ON "vaccine_aplication_medicines_medicine" ("vaccineAplicationId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4914bbe9651d1c3af78e433818" ON "vaccine_aplication_medicines_medicine" ("medicineId") `);
        await queryRunner.query(`ALTER TABLE "procedure_schedule" ADD CONSTRAINT "FK_f78fb1b64fa9f1d0a2225b3d7d0" FOREIGN KEY ("procedureId") REFERENCES "procedure"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "procedure_schedule" ADD CONSTRAINT "FK_bfcc32b9c7309c2c06a5bcf8e54" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "procedure_schedule" ADD CONSTRAINT "FK_1e5578caecb74bc212a60e20a07" FOREIGN KEY ("treatmentId") REFERENCES "treatment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "doctors" ADD CONSTRAINT "FK_ad816aa66aa42fad408b1b7d762" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consults" ADD CONSTRAINT "FK_37b58368c2e38a5929b30a37587" FOREIGN KEY ("animalId") REFERENCES "animals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consults" ADD CONSTRAINT "FK_38b3816a560fa09d1d7ea2a23db" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consults" ADD CONSTRAINT "FK_5dec29de0a7363eefad6f3fa7a0" FOREIGN KEY ("treatmentId") REFERENCES "treatment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vaccine_aplication" ADD CONSTRAINT "FK_bee364e62c8b3b2bc28e045c9f2" FOREIGN KEY ("animalId") REFERENCES "animals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "animals" ADD CONSTRAINT "FK_5addb4e2ff787b6651bba7aeca1" FOREIGN KEY ("sizeId") REFERENCES "animal_sizes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "animals" ADD CONSTRAINT "FK_3ac329903282a1b1aca44f76505" FOREIGN KEY ("typeId") REFERENCES "animal_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "animals" ADD CONSTRAINT "FK_d325f353f4cf75d84c7f4f5ff76" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "treatment_medicines_medicine" ADD CONSTRAINT "FK_af5c67107ebabc61e96cd88098a" FOREIGN KEY ("treatmentId") REFERENCES "treatment"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "treatment_medicines_medicine" ADD CONSTRAINT "FK_484ed36e0ea48b584e8677ac465" FOREIGN KEY ("medicineId") REFERENCES "medicine"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "vaccine_aplication_medicines_medicine" ADD CONSTRAINT "FK_be714de7af315fd04b961bd0c59" FOREIGN KEY ("vaccineAplicationId") REFERENCES "vaccine_aplication"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "vaccine_aplication_medicines_medicine" ADD CONSTRAINT "FK_4914bbe9651d1c3af78e4338184" FOREIGN KEY ("medicineId") REFERENCES "medicine"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vaccine_aplication_medicines_medicine" DROP CONSTRAINT "FK_4914bbe9651d1c3af78e4338184"`);
        await queryRunner.query(`ALTER TABLE "vaccine_aplication_medicines_medicine" DROP CONSTRAINT "FK_be714de7af315fd04b961bd0c59"`);
        await queryRunner.query(`ALTER TABLE "treatment_medicines_medicine" DROP CONSTRAINT "FK_484ed36e0ea48b584e8677ac465"`);
        await queryRunner.query(`ALTER TABLE "treatment_medicines_medicine" DROP CONSTRAINT "FK_af5c67107ebabc61e96cd88098a"`);
        await queryRunner.query(`ALTER TABLE "animals" DROP CONSTRAINT "FK_d325f353f4cf75d84c7f4f5ff76"`);
        await queryRunner.query(`ALTER TABLE "animals" DROP CONSTRAINT "FK_3ac329903282a1b1aca44f76505"`);
        await queryRunner.query(`ALTER TABLE "animals" DROP CONSTRAINT "FK_5addb4e2ff787b6651bba7aeca1"`);
        await queryRunner.query(`ALTER TABLE "vaccine_aplication" DROP CONSTRAINT "FK_bee364e62c8b3b2bc28e045c9f2"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea"`);
        await queryRunner.query(`ALTER TABLE "consults" DROP CONSTRAINT "FK_5dec29de0a7363eefad6f3fa7a0"`);
        await queryRunner.query(`ALTER TABLE "consults" DROP CONSTRAINT "FK_38b3816a560fa09d1d7ea2a23db"`);
        await queryRunner.query(`ALTER TABLE "consults" DROP CONSTRAINT "FK_37b58368c2e38a5929b30a37587"`);
        await queryRunner.query(`ALTER TABLE "doctors" DROP CONSTRAINT "FK_ad816aa66aa42fad408b1b7d762"`);
        await queryRunner.query(`ALTER TABLE "procedure_schedule" DROP CONSTRAINT "FK_1e5578caecb74bc212a60e20a07"`);
        await queryRunner.query(`ALTER TABLE "procedure_schedule" DROP CONSTRAINT "FK_bfcc32b9c7309c2c06a5bcf8e54"`);
        await queryRunner.query(`ALTER TABLE "procedure_schedule" DROP CONSTRAINT "FK_f78fb1b64fa9f1d0a2225b3d7d0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4914bbe9651d1c3af78e433818"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_be714de7af315fd04b961bd0c5"`);
        await queryRunner.query(`DROP TABLE "vaccine_aplication_medicines_medicine"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_484ed36e0ea48b584e8677ac46"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_af5c67107ebabc61e96cd88098"`);
        await queryRunner.query(`DROP TABLE "treatment_medicines_medicine"`);
        await queryRunner.query(`DROP TABLE "animals"`);
        await queryRunner.query(`DROP TABLE "vaccine_aplication"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "consults"`);
        await queryRunner.query(`DROP TABLE "doctors"`);
        await queryRunner.query(`DROP TABLE "procedure_schedule"`);
        await queryRunner.query(`DROP TABLE "treatment"`);
        await queryRunner.query(`DROP TABLE "medicine"`);
        await queryRunner.query(`DROP TABLE "procedure"`);
        await queryRunner.query(`DROP TABLE "animal_types"`);
        await queryRunner.query(`DROP TABLE "animal_sizes"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
