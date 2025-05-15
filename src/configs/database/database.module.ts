import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE_CONFIG } from '../constant.config';
import { databaseProviders } from './database.providers';
// import { SpeciesEntity } from 'src/api/species/species.entity';
// import { BreedEntity } from 'src/api/breed/breed.entity';
import { PetEntity } from 'src/api/pet/pet.entity';
import { PermissionEntity } from 'src/api/permission/permission.entity';
import { RoleEntity } from 'src/api/role/role.entity';
import { UserEntity } from 'src/api/user/user.entity';
import { AppointmentEntity } from 'src/api/appointment/appointment.entity';
import { BreedEntity } from 'src/api/breed/breed.entity';
import { SpeciesEntity } from 'src/api/species/species.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: DATABASE_CONFIG.host,
        port: DATABASE_CONFIG.port,
        username: DATABASE_CONFIG.username,
        password: DATABASE_CONFIG.password,
        database: DATABASE_CONFIG.database,
        entities: [
          PermissionEntity,
          RoleEntity,
          UserEntity,
          PetEntity,
          BreedEntity,
          SpeciesEntity,
          AppointmentEntity,
        ],
        migrations: [__dirname + '/../../migrations/*.ts'],
        autoLoadEntities: true,
        synchronize: false,
        logging: true || DATABASE_CONFIG.logging,
      }),
    }),
  ],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
