import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BreedEntity } from './breed.entity';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { IAdminPayload } from 'src/share/common/app.interface';
import { ERROR_BREED } from './breed.constant';

@Injectable()
export class BreedService {
  constructor(
    @InjectRepository(BreedEntity)
    private readonly repo: Repository<BreedEntity>,
  ) {}

  async create(dto: CreateBreedDto, user: IAdminPayload) {
    const existing = await this.repo.findOneBy({ name: dto.name });
    if (existing) {
      throw new BadRequestException(ERROR_BREED.BREED_ALREADY_EXIST.MESSAGE);
    }

    const entity = this.repo.create({
      ...dto,
      createdBy: user?.sub,
    });

    return await this.repo.save(entity);
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
