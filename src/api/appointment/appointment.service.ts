import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppointmentEntity } from './appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(AppointmentEntity)
    private readonly repo: Repository<AppointmentEntity>,
  ) {}

  create(dto: CreateAppointmentDto, userId: number) {
    const entity = this.repo.create({
      symptom: dto.symptom,
      appointmentTime: new Date(dto.appointmentTime),
      petId: +dto.petId,
      userId,
    });
    return this.repo.save(entity);
  }

  findAll() {
    return this.repo.find();
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
