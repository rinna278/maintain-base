import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetEntity } from './pet.entity';
import { PetService } from './pet.service';
import { UserEntity } from '../user/user.entity';
import { PetController } from './pet.controller';
import { BreedEntity } from '../breed/breed.entity';
import { SpeciesEntity } from '../species/species.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PetEntity,
      UserEntity,
      SpeciesEntity,
      BreedEntity,
    ]),
  ],
  controllers: [PetController],
  providers: [PetService],
  exports: [PetService],
})
export class PetModule {}
