import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { BREED_CONST } from './breed.constant';

import { SpeciesEntity } from '../species/species.entity';
import { PetEntity } from '../pet/pet.entity';

@Entity({ name: BREED_CONST.MODEL_NAME })
export class BreedEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'bigint', name: 'created_by', nullable: true })
  createdBy: number;

  @Column({ type: 'int', name: 'species_id' })
  speciesId: number;

  @ManyToOne(() => SpeciesEntity, (species) => species.breeds)
  @JoinColumn([{ name: 'species_id', referencedColumnName: 'id' }])
  species: SpeciesEntity;

  @OneToMany(() => PetEntity, (pet) => pet.breed)
  pets: PetEntity[];
}
