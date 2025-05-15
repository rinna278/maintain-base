import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreedEntity } from './breed.entity';
import { BreedController } from './breed.controller';
import { BreedService } from './breed.service';

@Module({
  imports: [TypeOrmModule.forFeature([BreedEntity])],
  controllers: [BreedController],
  providers: [BreedService],
})
export class BreedModule {}
