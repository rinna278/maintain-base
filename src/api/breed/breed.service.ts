import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BreedEntity } from './breed.entity';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';

@Injectable()
export class BreedService {
  constructor(
    @InjectRepository(BreedEntity)
    private readonly repo: Repository<BreedEntity>,
  ) {}

  create(dto: CreateBreedDto) {
    const entity = this.repo.create({
      name: dto.name,
      speciesId: +dto.speciesId,
    });
    return this.repo.save(entity);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  update(id: number, dto: UpdateBreedDto) {
    return this.repo.update(id, {
      ...dto,
      speciesId: dto.speciesId ? +dto.speciesId : undefined,
    });
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
