import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { AppointmentEntity } from './appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { IAdminPayload } from 'src/share/common/app.interface';
import { ConfirmAppointmentDto } from './dto/confirm-appointment.dto';
import { AppointmentStatus, ERROR_APPOINTMENT } from './appointment.constant';
import { PetEntity } from '../pet/pet.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(AppointmentEntity)
    private readonly repo: Repository<AppointmentEntity>,
    @InjectRepository(PetEntity)
    private readonly petRepo: Repository<PetEntity>,
  ) {}

  async create(dto: CreateAppointmentDto, user: IAdminPayload) {
    const pet = await this.petRepo.findOne({
      where: {
        id: +dto.petId,
        userId: user.sub,
      },
    });

    if (!pet) {
      throw new ForbiddenException(
        ERROR_APPOINTMENT.APPOINTMENT_PET_NOT_OWN.MESSAGE,
      );
    }

    const existingAppointment = await this.repo.findOne({
      where: {
        petId: +dto.petId,
        userId: user?.sub,
        status: In([AppointmentStatus.PENDING]),
      },
    });

    if (existingAppointment) {
      throw new ForbiddenException(
        ERROR_APPOINTMENT.APPOINTMENT_PET_EXISTED.MESSAGE,
      );
    }

    const entity = this.repo.create({
      symptom: dto.symptom,
      appointmentTime: new Date(dto.appointmentTime),
      petId: +dto.petId,
      userId: user?.sub,
    });
    return this.repo.save(entity);
  }

  findAll() {
    return this.repo.find();
  }

  async getMyAppointments(user: IAdminPayload) {
    const myAppt = await this.repo.find({
      where: { userId: user.sub },
      order: { appointmentTime: 'DESC' },
    });

    if (!myAppt || myAppt.length === 0) {
      throw new NotFoundException(
        ERROR_APPOINTMENT.APPOINTMENT_NOT_FOUND.MESSAGE,
      );
    }

    return myAppt;
  }

  async confirm(id: number, dto: ConfirmAppointmentDto, user: IAdminPayload) {
    const appointment = await this.repo.findOne({ where: { id } });

    if (!appointment) {
      throw new NotFoundException(
        ERROR_APPOINTMENT.APPOINTMENT_NOT_FOUND.MESSAGE,
      );
    }

    const currentStatus = appointment.status as AppointmentStatus;
    const newStatus = dto.status as AppointmentStatus;

    let isValidTransition = false;

    switch (currentStatus) {
      case AppointmentStatus.PENDING:
        isValidTransition =
          newStatus === AppointmentStatus.CONFIRMED ||
          newStatus === AppointmentStatus.CANCELLED;
        break;

      case AppointmentStatus.CONFIRMED:
        isValidTransition = newStatus === AppointmentStatus.COMPLETED;
        break;

      default:
        isValidTransition = false;
    }

    if (!isValidTransition) {
      throw new ForbiddenException(
        ERROR_APPOINTMENT.APPOINTMENT_CONFIRM_ERROR.MESSAGE,
      );
    }

    appointment.status = newStatus;
    appointment.doctorId = user.sub;

    return this.repo.save(appointment);
  }
}
