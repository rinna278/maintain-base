import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Patch,
  Param,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { AppointmentService } from './appointment.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { AUTH_SWAGGER_RESPONSE } from '../auth/auth.constant';
import { API_CONFIG } from 'src/configs/constant.config';
import { GetUser } from 'src/share/decorator/get-user.decorator';
import { IAdminPayload } from 'src/share/common/app.interface';
import { PermissionMetadata } from '../permission/permission.decorator';
import { PermissionGuard } from '../permission/permission.guard';
import { PERMISSIONS } from '../permission/permission.constant';
import { ConfirmAppointmentDto } from './dto/confirm-appointment.dto';
import { APPOINTMENT_SWAGGER_RESPONSE } from './appointment.constant';

@Controller({
  version: [API_CONFIG.VERSION_V1],
  path: 'appointment',
})
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Appointment')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiBadRequestResponse(AUTH_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
@ApiInternalServerErrorResponse(AUTH_SWAGGER_RESPONSE.INTERNAL_SERVER_EXCEPTION)
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @ApiOkResponse(APPOINTMENT_SWAGGER_RESPONSE.CREATE_SUCCESS)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() dto: CreateAppointmentDto, @GetUser() user: IAdminPayload) {
    return this.appointmentService.create(dto, user);
  }

  @ApiOkResponse(APPOINTMENT_SWAGGER_RESPONSE.GET_LIST_SUCCESS)
  @HttpCode(HttpStatus.OK)
  @Get()
  @PermissionMetadata(PERMISSIONS.APP_GET_ALL)
  @UseGuards(PermissionGuard)
  findAll() {
    return this.appointmentService.findAll();
  }

  @Get('my-appointments')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse(APPOINTMENT_SWAGGER_RESPONSE.GET_MY_APPOINTMENTS_SUCCESS)
  getMyAppointments(@GetUser() user: IAdminPayload) {
    return this.appointmentService.getMyAppointments(user);
  }

  @Patch('confirm/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @PermissionMetadata(PERMISSIONS.APP_CONFIRM)
  @UseGuards(PermissionGuard)
  @ApiOkResponse(APPOINTMENT_SWAGGER_RESPONSE.CONFIRM_SUCCESS)
  confirm(
    @Param('id') id: number,
    @Body() dto: ConfirmAppointmentDto,
    @GetUser() user: IAdminPayload,
  ) {
    return this.appointmentService.confirm(+id, dto, user);
  }
}
