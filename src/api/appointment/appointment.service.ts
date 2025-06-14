import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { AppointmentEntity } from './appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { IAdminPayload, IPaginateParams } from 'src/share/common/app.interface';
import { ConfirmAppointmentDto } from './dto/confirm-appointment.dto';
import { AppointmentStatus, ERROR_APPOINTMENT } from './appointment.constant';
import { PetEntity } from '../pet/pet.entity';
import { StringUtil } from 'src/share/utils/string.util';
import { BaseService } from 'src/share/database/base.service';

@Injectable()
export class AppointmentService extends BaseService<AppointmentEntity> {
  constructor(
    @InjectRepository(AppointmentEntity)
    private readonly repo: Repository<AppointmentEntity>,
    @InjectRepository(PetEntity)
    private readonly petRepo: Repository<PetEntity>,
  ) {
    super(repo);
  }

  async createAppointment(dto: CreateAppointmentDto, user: IAdminPayload) {
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

  findAll(params: IPaginateParams) {
    const conditions: any = {};
    if (params.search) {
      conditions.name = Like(
        `%${StringUtil.mysqlRealEscapeString(params.search)}%`,
      );
    }
    if (params.status) {
      conditions.status = Number(params.status);
    }

    return this.getPagination(conditions, params);
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

  async cancelAppointment(id: number, user: IAdminPayload) {
    const appointment = await this.repo.findOne({
      where: { id, userId: user.sub },
    });

    if (!appointment) {
      throw new NotFoundException(
        ERROR_APPOINTMENT.APPOINTMENT_NOT_FOUND.MESSAGE,
      );
    }

    if (appointment.status !== AppointmentStatus.PENDING) {
      throw new ForbiddenException(
        ERROR_APPOINTMENT.APPOINTMENT_CANNOT_CANCEL.MESSAGE,
      );
    }

    appointment.status = AppointmentStatus.CANCELLED;
    return this.repo.save(appointment);
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
