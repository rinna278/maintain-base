import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../share/database/base.entity';
import { UserEntity } from '../user/user.entity';
import { DoctorRequestStatus } from './doctor-request.constant';

@Entity({ name: 'doctor_requests' })
export class DoctorRequestEntity extends BaseEntity {
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ type: 'text', nullable: true })
  cv: string;

  @Column({
    type: 'enum',
    enum: DoctorRequestStatus,
    default: DoctorRequestStatus.PENDING,
  })
  status: DoctorRequestStatus;
}
