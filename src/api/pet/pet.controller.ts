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
  ApiTags,
} from '@nestjs/swagger';
import { AUTH_SWAGGER_RESPONSE } from '../auth/auth.constant';

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

  @Get()
  findAll(): Promise<PetEntity[]> {
    return this.petService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PetEntity> {
    return this.petService.findOne(id);
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string): Promise<PetEntity[]> {
    return this.petService.findByUserId(userId);
  }

  @Post()
  create(@Body() createPetDto: CreatePetDto): Promise<PetEntity> {
    return this.petService.create(createPetDto);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePetDto: UpdatePetDto,
  ): Promise<PetEntity> {
    return this.petService.update(id, updatePetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.petService.remove(id);
  }
}
