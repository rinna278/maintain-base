import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PetService } from './pet.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PetEntity } from './pet.entity';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('pet')
@UseGuards(JwtAuthGuard)
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
