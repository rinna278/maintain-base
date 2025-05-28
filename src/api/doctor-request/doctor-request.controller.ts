import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { PermissionGuard } from '../permission/permission.guard';
import { PermissionMetadata } from '../permission/permission.decorator';
import { API_CONFIG } from '../../configs/constant.config';
import { DoctorRequestService } from './doctor-request.service';
import { ParamIdBaseDto } from '../../share/common/dto/query-param.dto';
import { GetUser } from '../../share/decorator/get-user.decorator';
import { IAdminPayload } from '../../share/common/app.interface';
import { PERMISSIONS } from '../permission/permission.constant';
import { CreateDoctorRequestDto } from './dto/create-doctor-request.dto';
import { FilterDoctorRequestDto } from './dto/filter-doctor-request.dto';
import { DOCTOR_REQUEST_SWAGGER_RESPONSE } from './doctor-request.constant';
import { AUTH_SWAGGER_RESPONSE } from '../auth/auth.constant';

@Controller({
  version: [API_CONFIG.VERSION_V1],
  path: 'doctor-requests',
})
@ApiTags('Doctor Request')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiBadRequestResponse(AUTH_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
@ApiInternalServerErrorResponse(AUTH_SWAGGER_RESPONSE.INTERNAL_SERVER_EXCEPTION)
export class DoctorRequestController {
  constructor(private readonly service: DoctorRequestService) {}

  @ApiOkResponse(DOCTOR_REQUEST_SWAGGER_RESPONSE.CREATE_REQUEST_SUCCESS)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  public createRequest(
    @GetUser() user: IAdminPayload,
    @Body() dto: CreateDoctorRequestDto,
  ) {
    return this.service.createRequest(user.sub, dto);
  }

  @ApiOkResponse(DOCTOR_REQUEST_SWAGGER_RESPONSE.APPROVE_REQUEST_SUCCESS)
  @Put('approve/:id')
  @UseGuards(PermissionGuard)
  @PermissionMetadata(PERMISSIONS.USER_APPROVE_DOCTOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async approveRequest(@Param() param: ParamIdBaseDto) {
    await this.service.approveRequest(+param.id);
  }

  @ApiOkResponse(DOCTOR_REQUEST_SWAGGER_RESPONSE.REJECT_REQUEST_SUCCESS)
  @Put('reject/:id')
  @UseGuards(PermissionGuard)
  @PermissionMetadata(PERMISSIONS.USER_REJECT_DOCTOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async rejectRequest(@Param() param: ParamIdBaseDto) {
    await this.service.rejectRequest(+param.id);
  }

  @ApiOkResponse(DOCTOR_REQUEST_SWAGGER_RESPONSE.REVOKE_DOCTOR_ROLE_SUCCESS)
  @Put('revoke/:userId')
  @UseGuards(PermissionGuard)
  @PermissionMetadata(PERMISSIONS.USER_REVOKE_DOCTOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async revokeDoctorRole(@Param('userId') userId: number) {
    await this.service.revokeDoctorRole(userId);
  }

  @ApiOkResponse(DOCTOR_REQUEST_SWAGGER_RESPONSE.GET_LIST_SUCCESS)
  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(PermissionGuard)
  @PermissionMetadata(PERMISSIONS.USER_VIEW)
  public async getRequests(@Query() query: FilterDoctorRequestDto) {
    return await this.service.getAllRequests(query.status);
  }
}
