import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentEntity } from './appointment.entity';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { PetEntity } from '../pet/pet.entity';
import { AppointmentSchedulerService } from './appointment-scheduler.service';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentEntity, PetEntity])],
  controllers: [AppointmentController],
  providers: [AppointmentService, AppointmentSchedulerService],
  exports: [AppointmentService],
})
export class AppointmentModule {}
