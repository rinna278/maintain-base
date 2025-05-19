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

@Controller({
  version: [API_CONFIG.VERSION_V1],
  path: 'doctor-requests',
})
@ApiTags('Doctor Request')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiBadRequestResponse({ description: 'Invalid request' })
@ApiInternalServerErrorResponse({ description: 'Server error' })
export class DoctorRequestController {
  constructor(private readonly service: DoctorRequestService) {}

  @ApiOkResponse({ description: 'Send doctor request successfully' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  public createRequest(
    @GetUser() user: IAdminPayload,
    @Body() dto: CreateDoctorRequestDto,
  ) {
    return this.service.createRequest(user.sub, dto);
  }

  @ApiOkResponse({ description: 'Admin approve request successfully' })
  @Put(':id/approve')
  @UseGuards(PermissionGuard)
  @PermissionMetadata(PERMISSIONS.USER_UPDATE)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async approveRequest(@Param() param: ParamIdBaseDto) {
    await this.service.approveRequest(+param.id);
  }

  @ApiOkResponse({ description: 'Admin reject request successfully' })
  @Put(':id/reject')
  @UseGuards(PermissionGuard)
  @PermissionMetadata(PERMISSIONS.USER_UPDATE)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async rejectRequest(@Param() param: ParamIdBaseDto) {
    await this.service.rejectRequest(+param.id);
  }

  @ApiOkResponse({ description: "Admin revoke doctor's role successfully" })
  @Put('revoke/:userId')
  @UseGuards(PermissionGuard)
  @PermissionMetadata(PERMISSIONS.USER_UPDATE)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async revokeDoctorRole(@Param('userId') userId: number) {
    await this.service.revokeDoctorRole(userId);
  }

  @ApiOkResponse({ description: 'List of doctor requests' })
  @Get()
  @UseGuards(PermissionGuard)
  @PermissionMetadata(PERMISSIONS.USER_VIEW)
  public async getRequests(@Query() query: FilterDoctorRequestDto) {
    return await this.service.getAllRequests(query.status);
  }
}
