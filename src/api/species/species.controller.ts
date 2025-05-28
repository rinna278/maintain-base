import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { API_CONFIG } from '../../configs/constant.config';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { AUTH_SWAGGER_RESPONSE } from '../auth/auth.constant';
import { SpeciesService } from './species.service';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { SpeciesEntity } from './species.entity';
import { ParamIdBaseDto } from '../../share/common/dto/query-param.dto';
import { SPECIES_SWAGGER_RESPONSE } from './species.constant';
import { GetUser } from 'src/share/decorator/get-user.decorator';
import { IAdminPayload } from 'src/share/common/app.interface';
import { QueryParamDto } from '../user/dto/query-param.dto';
import { PermissionMetadata } from '../permission/permission.decorator';
import { PERMISSIONS } from '../permission/permission.constant';
import { PermissionGuard } from '../permission/permission.guard';

@Controller({
  version: [API_CONFIG.VERSION_V1],
  path: 'species',
})
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Species')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiBadRequestResponse(AUTH_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
@ApiInternalServerErrorResponse(AUTH_SWAGGER_RESPONSE.INTERNAL_SERVER_EXCEPTION)
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @ApiOkResponse(SPECIES_SWAGGER_RESPONSE.CREATE_SUCCESS)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @PermissionMetadata(PERMISSIONS.SPECIES_CREATE)
  @UseGuards(PermissionGuard)
  public async create(
    @Body() dto: CreateSpeciesDto,
    @GetUser() user: IAdminPayload,
  ): Promise<SpeciesEntity> {
    return this.speciesService.createSpecies(dto, user);
  }

  @ApiOkResponse(SPECIES_SWAGGER_RESPONSE.GET_LIST_SUCCESS)
  @Get()
  @HttpCode(HttpStatus.OK)
  public async findAll(@Query() query: QueryParamDto): Promise<any> {
    return this.speciesService.findAll(query);
  }

  @ApiOkResponse(SPECIES_SWAGGER_RESPONSE.GET_SUCCESS)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async findOne(@Param() param: ParamIdBaseDto): Promise<SpeciesEntity> {
    return this.speciesService.findOne(+param.id);
  }

  @ApiOkResponse(SPECIES_SWAGGER_RESPONSE.UPDATE_SUCCESS)
  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @PermissionMetadata(PERMISSIONS.SPECIES_UPDATE)
  @UseGuards(PermissionGuard)
  public async update(
    @Param() param: ParamIdBaseDto,
    @Body() dto: UpdateSpeciesDto,
  ): Promise<void> {
    await this.speciesService.updateSpecies(+param.id, dto);
  }

  @ApiOkResponse(SPECIES_SWAGGER_RESPONSE.DELETE_SUCCESS)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @PermissionMetadata(PERMISSIONS.SPECIES_DELETE)
  @UseGuards(PermissionGuard)
  public async remove(@Param() param: ParamIdBaseDto): Promise<void> {
    await this.speciesService.remove(+param.id);
  }
}
