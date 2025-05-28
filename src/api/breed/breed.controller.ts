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
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { BreedService } from './breed.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { API_CONFIG } from 'src/configs/constant.config';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { AUTH_SWAGGER_RESPONSE } from '../auth/auth.constant';
import { GetUser } from 'src/share/decorator/get-user.decorator';
import { IAdminPayload } from 'src/share/common/app.interface';
import { BREED_SWAGGER_RESPONSE } from './breed.constant';
import { PermissionGuard } from '../permission/permission.guard';
import { PermissionMetadata } from '../permission/permission.decorator';
import { PERMISSIONS } from '../permission/permission.constant';

@Controller({
  version: [API_CONFIG.VERSION_V1],
  path: 'breed',
})
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Breed')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiBadRequestResponse(AUTH_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
@ApiInternalServerErrorResponse(AUTH_SWAGGER_RESPONSE.INTERNAL_SERVER_EXCEPTION)
export class BreedController {
  constructor(private readonly breedService: BreedService) {}

  @UseGuards(PermissionGuard)
  @PermissionMetadata(PERMISSIONS.BREED_CREATE)
  @ApiOkResponse(BREED_SWAGGER_RESPONSE.CREATE_SUCCESS)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() dto: CreateBreedDto, @GetUser() user: IAdminPayload) {
    return this.breedService.create(dto, user);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse(BREED_SWAGGER_RESPONSE.GET_SUCCESS)
  @Get()
  findAll() {
    return this.breedService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse(BREED_SWAGGER_RESPONSE.GET_ONE_SUCCESS)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.breedService.findOne(+id);
  }

  @UseGuards(PermissionGuard)
  @PermissionMetadata(PERMISSIONS.BREED_CREATE)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse(BREED_SWAGGER_RESPONSE.UPDATE_SUCCESS)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBreedDto) {
    return this.breedService.update(+id, dto);
  }

  @UseGuards(PermissionGuard)
  @PermissionMetadata(PERMISSIONS.BREED_DELETE)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse(BREED_SWAGGER_RESPONSE.DELETE_SUCCESS)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.breedService.remove(+id);
  }
}
