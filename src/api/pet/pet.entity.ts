// pet.entity.ts
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { PET_CONST } from './pet.constant';
import { BaseEntity } from '../../share/database/base.entity';
import { UserEntity } from '../user/user.entity';
// import { SpeciesEntity } from '../species/species.entity';
// import { BreedEntity } from '../breed/breed.entity';
// import { AppointmentEntity } from '../appointment/appointment.entity';

@Entity({ name: PET_CONST.MODEL_NAME })
export class PetEntity extends BaseEntity {
  @Column({ length: 255 })
  name: string;

  @Column({ type: 'bigint', name: 'created_by', nullable: true })
  createdBy: string;

  @Column({ type: 'bigint', name: 'user_id' })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.pets)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: UserEntity;
}
