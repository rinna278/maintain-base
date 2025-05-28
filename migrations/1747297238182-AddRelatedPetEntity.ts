import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRelatedPetEntity1747297238182 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'appointment_status_enum') THEN
          CREATE TYPE appointment_status_enum AS ENUM ('0', '1', '2', '3');
        END IF;
      END
      $$;
    `);
    // Tạo bảng species
    await queryRunner.query(`
      CREATE TABLE "species" (
        "id" BIGSERIAL PRIMARY KEY,
        "name" VARCHAR(255) NOT NULL,
        "created_by" BIGINT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now()
      );
    `);

    // Tạo bảng breed
    await queryRunner.query(`
      CREATE TABLE "breed" (
        "id" BIGSERIAL PRIMARY KEY,
        "name" VARCHAR(255) NOT NULL,
        "created_by" BIGINT NULL,
        "species_id" BIGINT NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "FK_breed_species_id"
          FOREIGN KEY ("species_id") REFERENCES "species"("id")
          ON DELETE CASCADE
          ON UPDATE NO ACTION
      );
    `);
    await queryRunner.query(`
      CREATE INDEX "IDX_breed_species_id" ON "breed"("species_id");
    `);

    // Tạo bảng pet
    await queryRunner.query(`
      CREATE TABLE "pet" (
        "id" BIGSERIAL PRIMARY KEY,
        "name" VARCHAR(255) NOT NULL,
        "species_id" BIGINT NOT NULL,
        "breed_id" BIGINT NULL,
        "user_id" BIGINT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" timestamp NULL,
        CONSTRAINT "FK_pet_user_id"
          FOREIGN KEY ("user_id") REFERENCES "user"("id")
          ON DELETE CASCADE
          ON UPDATE NO ACTION,
        CONSTRAINT "FK_pet_species_id"
          FOREIGN KEY ("species_id") REFERENCES "species"("id")
          ON DELETE SET NULL
          ON UPDATE NO ACTION,
        CONSTRAINT "FK_pet_breed_id"
          FOREIGN KEY ("breed_id") REFERENCES "breed"("id")
          ON DELETE SET NULL
          ON UPDATE NO ACTION
      );
    `);
    await queryRunner.query(`
      CREATE INDEX "IDX_pet_user_id" ON "pet"("user_id");
    `);
    await queryRunner.query(`
      CREATE INDEX "IDX_pet_species_id" ON "pet"("species_id");
    `);
    await queryRunner.query(`
      CREATE INDEX "IDX_pet_breed_id" ON "pet"("breed_id");
    `);

    // Tạo bảng appointment
    await queryRunner.query(`
      CREATE TABLE "appointment" (
        "id" BIGSERIAL PRIMARY KEY,
        "status" "appointment_status_enum" NOT NULL DEFAULT '1',
        "symptom" VARCHAR(255) NULL,
        "appointment_time" TIMESTAMP NOT NULL,
        "user_id" BIGINT NOT NULL,
        "doctor_id" BIGINT NULL,
        "pet_id" BIGINT NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" timestamp NULL,
        CONSTRAINT "FK_appointment_user_id"
          FOREIGN KEY ("user_id") REFERENCES "user"("id")
          ON DELETE CASCADE
          ON UPDATE NO ACTION,
        CONSTRAINT "FK_appointment_pet_id"
          FOREIGN KEY ("pet_id") REFERENCES "pet"("id")
          ON DELETE CASCADE
          ON UPDATE NO ACTION
      );
    `);
    await queryRunner.query(`
      CREATE INDEX "IDX_appointment_user_id" ON "appointment"("user_id");
    `);
    await queryRunner.query(`
      CREATE INDEX "IDX_appointment_pet_id" ON "appointment"("pet_id");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "appointment";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "pet";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "breed";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "species";`);
  }
}
