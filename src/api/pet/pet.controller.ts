import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ClassSerializerInterceptor,
  UseInterceptors,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { PetService } from './pet.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PetEntity } from './pet.entity';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { API_CONFIG } from 'src/configs/constant.config';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AUTH_SWAGGER_RESPONSE } from '../auth/auth.constant';
import { GetUser } from 'src/share/decorator/get-user.decorator';
import { IAdminPayload } from 'src/share/common/app.interface';
import { USER_SWAGGER_RESPONSE } from '../user/user.constant';
import { PermissionMetadata } from '../permission/permission.decorator';
import { PERMISSIONS } from '../permission/permission.constant';
import { PermissionGuard } from '../permission/permission.guard';

@Controller({
  version: [API_CONFIG.VERSION_V1],
  path: 'pet',
})
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Pet')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiBadRequestResponse(AUTH_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
@ApiInternalServerErrorResponse(AUTH_SWAGGER_RESPONSE.INTERNAL_SERVER_EXCEPTION)
export class PetController {
  constructor(private readonly petService: PetService) {}

  @ApiOkResponse(USER_SWAGGER_RESPONSE.GET_SUCCESS)
  @Get()
  @HttpCode(HttpStatus.OK)
  // @PermissionMetadata(PERMISSIONS.USER_READ)
  findAll(): Promise<PetEntity[]> {
    return this.petService.findAll();
  }

  @ApiOkResponse(USER_SWAGGER_RESPONSE.GET_SUCCESS)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: number): Promise<PetEntity> {
    return this.petService.findOne(id);
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: number): Promise<PetEntity[]> {
    return this.petService.findByUserId(userId);
  }

  @Post()
  @PermissionMetadata(PERMISSIONS.PET_CREATE)
  @UseGuards(PermissionGuard)
  create(
    @Body() createPetDto: CreatePetDto,
    @GetUser() user: IAdminPayload,
  ): Promise<PetEntity> {
    return this.petService.create(createPetDto, user);
  }

  @ApiOkResponse(USER_SWAGGER_RESPONSE.UPDATE_SUCCESS)
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(
    @Param('id') id: number,
    @Body() updatePetDto: UpdatePetDto,
  ): Promise<PetEntity> {
    return this.petService.update(id, updatePetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.petService.remove(id);
  }
}
