import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPetRelatedTables1747281200495 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "pet" (
                id bigserial NOT NULL,
                name varchar(255) NOT NULL,
                type varchar(100) NULL,
                user_id bigint NOT NULL,
                created_at timestamp NOT NULL DEFAULT now(),
                updated_at timestamp NOT NULL DEFAULT now(),
                CONSTRAINT "PK_pet_id" PRIMARY KEY (id)
            );
        `);
    await queryRunner.query(`
            ALTER TABLE "pet"
            ADD CONSTRAINT "FK_pet_user_id" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "pet" DROP CONSTRAINT IF EXISTS "FK_pet_user_id";
        `);
    await queryRunner.query(`
            DROP TABLE IF EXISTS "pet";
        `);
  }
}
