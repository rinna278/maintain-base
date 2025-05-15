// // appointment.entity.ts
// import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
// import { AppointmentStatus, APPOINTMENT_CONST } from './appointment.constant';
// import { BaseEntity } from '../../share/database/base.entity';
// import { UserEntity } from '../user/user.entity';
// import { PetEntity } from '../pet/pet.entity';

// @Entity({ name: APPOINTMENT_CONST.MODEL_NAME })
// export class AppointmentEntity extends BaseEntity {
//   @Column({
//     type: 'enum',
//     enum: AppointmentStatus,
//     default: AppointmentStatus.PENDING,
//   })
//   status: number;

//   @Column({ type: 'varchar', nullable: true })
//   symptom: string;

//   @Column({ type: 'timestamp', name: 'appointment_time' })
//   appointmentTime: Date;

//   @Column({ type: 'bigint', name: 'user_id' })
//   userId: string;

//   @ManyToOne(() => UserEntity)
//   @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
//   user: UserEntity;

//   @Column({ type: 'bigint', name: 'pet_id' })
//   petId: string;

//   @ManyToOne(() => PetEntity, (pet) => pet.appointments)
//   @JoinColumn([{ name: 'pet_id', referencedColumnName: 'id' }])
//   pet: PetEntity;

//   @Column({ type: 'bigint', name: 'created_by', nullable: true })
//   createdBy: string;
// }
