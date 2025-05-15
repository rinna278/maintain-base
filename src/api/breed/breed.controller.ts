import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { BreedService } from './breed.service';

@Controller('breeds')
export class BreedController {
  constructor(private readonly breedService: BreedService) {}

  @Post()
  create(@Body() dto: CreateBreedDto) {
    return this.breedService.create(dto);
  }

  @Get()
  findAll() {
    return this.breedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.breedService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBreedDto) {
    return this.breedService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.breedService.remove(+id);
  }
}
