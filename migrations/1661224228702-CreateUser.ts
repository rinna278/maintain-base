import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1661224228702 implements MigrationInterface {
  name = 'CreateUser1661224228702';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "user_gender_enum" AS ENUM ('1', '2', '3');
    `);
    await queryRunner.query(`
      CREATE TYPE "user_status_enum" AS ENUM ('1', '2', '3', '4');
    `);
    await queryRunner.query(`
      CREATE TABLE "user" (
        id bigserial NOT NULL,
        created_at timestamp NOT NULL DEFAULT now(),
        updated_at timestamp NOT NULL DEFAULT now(),
        deleted_at timestamp NULL,
        "name" varchar(255) NOT NULL,
        email varchar(255) NOT NULL,
        "password" varchar(200) NOT NULL,
        status "user_status_enum" NOT NULL DEFAULT '1'::user_status_enum,
        created_by int8 NULL,
        phone varchar(14) NULL,
        user_agent varchar(255) NULL,
        ip_address varchar(255) NULL,
        last_login timestamp NULL,
        current_hashed_refresh_token varchar NULL,
        role_id serial4 NOT NULL,
        CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id),
        CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8" UNIQUE (name),
        CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE \"user\"
    `);
    await queryRunner.query(`
      DROP TYPE "user_gender_enum";
    `);
    await queryRunner.query(`
      DROP TYPE "user_status_enum";
    `);
  }
}
