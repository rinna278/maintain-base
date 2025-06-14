import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { BreedEntity } from './breed.entity';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { IAdminPayload, IPaginateParams } from 'src/share/common/app.interface';
import { ERROR_BREED } from './breed.constant';
import { BaseService } from 'src/share/database/base.service';
import { StringUtil } from 'src/share/utils/string.util';

@Injectable()
export class BreedService extends BaseService<BreedEntity> {
  constructor(
    @InjectRepository(BreedEntity)
    private readonly repo: Repository<BreedEntity>,
  ) {
    super(repo);
  }

  async createBreed(dto: CreateBreedDto, user: IAdminPayload) {
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

  findAll(params: IPaginateParams) {
    const conditions: any = {};
    if (params.search) {
      conditions.name = Like(
        `%${StringUtil.mysqlRealEscapeString(params.search)}%`,
      );
    }
    if (params.status) {
      conditions.status = Number(params.status);
    }

    return this.getPagination(conditions, params);
  }

  findOne(id: number) {
    return this.get(id);
  }

  updateBreed(id: number, dto: UpdateBreedDto) {
    return this.update(id, dto);
  }

  deleteBreed(id: number) {
    return this.delete(id);
  }
}
