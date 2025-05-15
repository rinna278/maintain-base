import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { AppointmentService } from './appointment.service';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  create(@Body() dto: CreateAppointmentDto, @Req() req) {
    const userId = req.user.id;
    return this.appointmentService.create(dto, +userId);
  }

  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }
}
