import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetEntity } from './pet.entity';
import { PetService } from './pet.service';
import { UserEntity } from '../user/user.entity';
import { PetController } from './pet.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PetEntity, UserEntity])],
  controllers: [PetController],
  providers: [PetService],
  exports: [PetService],
})
export class PetModule {}
