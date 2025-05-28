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
import { PET_SWAGGER_RESPONSE } from './pet.constant';

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

  @ApiOkResponse(PET_SWAGGER_RESPONSE.GET_LIST_SUCCESS)
  @Get()
  @HttpCode(HttpStatus.OK)
  @PermissionMetadata(PERMISSIONS.PET_READ)
  @UseGuards(PermissionGuard)
  findAll(): Promise<PetEntity[]> {
    return this.petService.findAll();
  }

  @ApiOkResponse(PET_SWAGGER_RESPONSE.GET_MY_PETS_SUCCESS)
  @Get('my-pets')
  @HttpCode(HttpStatus.OK)
  getMyPets(@GetUser() user: IAdminPayload): Promise<PetEntity[]> {
    return this.petService.findByUserId(user.sub);
  }

  @ApiOkResponse(PET_SWAGGER_RESPONSE.GET_SUCCESS)
  @Get(':id')
  @PermissionMetadata(PERMISSIONS.PET_READ)
  @UseGuards(PermissionGuard)
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: number): Promise<PetEntity> {
    return this.petService.findOne(id);
  }

  @PermissionMetadata(PERMISSIONS.PET_READ_BY_USER)
  @UseGuards(PermissionGuard)
  @ApiOkResponse(PET_SWAGGER_RESPONSE.GET_PETS_OF_USER_SUCCESS)
  @Get('user/:userId')
  findByUserId(@Param('userId') userId: number): Promise<PetEntity[]> {
    return this.petService.findByUserId(userId);
  }

  @ApiOkResponse(PET_SWAGGER_RESPONSE.CREATE_SUCCESS)
  @Post()
  @PermissionMetadata(PERMISSIONS.PET_CREATE)
  @UseGuards(PermissionGuard)
  create(
    @Body() createPetDto: CreatePetDto,
    @GetUser() user: IAdminPayload,
  ): Promise<PetEntity> {
    return this.petService.create(createPetDto, user);
  }

  @PermissionMetadata(PERMISSIONS.PET_UPDATE)
  @UseGuards(PermissionGuard)
  @ApiOkResponse(USER_SWAGGER_RESPONSE.UPDATE_SUCCESS)
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(
    @Param('id') id: number,
    @Body() updatePetDto: UpdatePetDto,
  ): Promise<PetEntity> {
    return this.petService.update(id, updatePetDto);
  }

  @PermissionMetadata(PERMISSIONS.PET_DELETE)
  @UseGuards(PermissionGuard)
  @ApiOkResponse(PET_SWAGGER_RESPONSE.DELETE_SUCCESS)
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.petService.remove(id);
  }
}
