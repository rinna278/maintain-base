import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { PET_CONST } from './pet.constant';
import { BaseEntity } from '../../share/database/base.entity';
import { UserEntity } from '../user/user.entity';
import { SpeciesEntity } from '../species/species.entity';
import { BreedEntity } from '../breed/breed.entity';
import { AppointmentEntity } from '../appointment/appointment.entity';

@Entity({ name: PET_CONST.MODEL_NAME })
export class PetEntity extends BaseEntity {
  @Column({ length: 255 })
  name: string;

  @Column({ type: 'bigint', name: 'created_by', nullable: true })
  createdBy: number;

  @Column({ type: 'bigint', name: 'user_id' })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.pets)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: UserEntity;

  @Column({ type: 'int', name: 'species_id', nullable: true })
  speciesId: number;

  @ManyToOne(() => SpeciesEntity, (species) => species.pets)
  @JoinColumn([{ name: 'species_id', referencedColumnName: 'id' }])
  species: SpeciesEntity;

  @Column({ type: 'int', name: 'breed_id', nullable: true })
  breedId: number;

  @ManyToOne(() => BreedEntity, (breed) => breed.pets)
  @JoinColumn([{ name: 'breed_id', referencedColumnName: 'id' }])
  breed: BreedEntity;

  @OneToMany(() => AppointmentEntity, (appointment) => appointment.pet)
  appointments: AppointmentEntity[];
}
