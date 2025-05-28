import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDoctorRequest1747546533693 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "doctor_request_status_enum" AS ENUM ('1', '2', '3');
    `);

    await queryRunner.query(`
      CREATE TABLE "doctor_requests" (
        id BIGSERIAL NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT now(),
        updated_at TIMESTAMP NOT NULL DEFAULT now(),
        deleted_at TIMESTAMP NULL,
        user_id BIGINT NOT NULL,
        cv TEXT NULL,
        status "doctor_request_status_enum" NOT NULL DEFAULT '1',
        CONSTRAINT "PK_doctor_requests_id" PRIMARY KEY (id)
      );
    `);

    await queryRunner.query(`
      ALTER TABLE "doctor_requests"
      ADD CONSTRAINT "FK_doctor_requests_user_id"
      FOREIGN KEY ("user_id") REFERENCES "user"("id")
      ON DELETE CASCADE ON UPDATE NO ACTION;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "doctor_requests" DROP CONSTRAINT "FK_doctor_requests_user_id";
    `);

    await queryRunner.query(`
      DROP TABLE IF EXISTS "doctor_requests";
    `);

    await queryRunner.query(`
      DROP TYPE IF EXISTS "doctor_request_status_enum";
    `);
  }
}
