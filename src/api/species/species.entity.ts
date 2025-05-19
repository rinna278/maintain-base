import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { SPECIES_CONST } from './species.constant';
import { BreedEntity } from '../breed/breed.entity';
import { PetEntity } from '../pet/pet.entity';

@Entity({ name: SPECIES_CONST.MODEL_NAME })
export class SpeciesEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ length: 255, unique: true })
  name: string;

  @Column({ type: 'bigint', name: 'created_by', nullable: true })
  createdBy: number;

  @OneToMany(() => BreedEntity, (breed) => breed.species)
  breeds: BreedEntity[];

  @OneToMany(() => PetEntity, (pet) => pet.species)
  pets: PetEntity[];
}
