import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { SpeciesEntity } from './species.entity';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { IAdminPayload, IPaginateParams } from 'src/share/common/app.interface';
import { StringUtil } from 'src/share/utils/string.util';
import { BaseService } from 'src/share/database/base.service';
import { ERROR_SPECIES } from './species.constant';

@Injectable()
export class SpeciesService extends BaseService<SpeciesEntity> {
  constructor(
    @InjectRepository(SpeciesEntity)
    private readonly speciesRepository: Repository<SpeciesEntity>,
  ) {
    super(speciesRepository);
  }

  async createSpecies(
    dto: CreateSpeciesDto,
    user: IAdminPayload,
  ): Promise<SpeciesEntity> {
    const existing = await this.speciesRepository.findOneBy({ name: dto.name });
    if (existing) {
      throw new BadRequestException(ERROR_SPECIES.SPECIES_NAME_EXISTED.MESSAGE);
    }

    const entity = this.speciesRepository.create({
      ...dto,
      createdBy: user?.sub,
    });
    return await this.speciesRepository.save(entity);
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

    return this.getPagination(conditions, params, ['breeds']);
  }

  public async findOne(id: number): Promise<SpeciesEntity> {
    const species = await this.speciesRepository.findOneBy({ id });
    if (!species) {
      throw new NotFoundException(ERROR_SPECIES.SPECIES_NOT_FOUND.MESSAGE);
    }
    return species;
  }

  public async updateSpecies(
    id: number,
    dto: UpdateSpeciesDto,
  ): Promise<boolean> {
    const result = await this.speciesRepository.update(id, dto);
    if (result.affected === 0) {
      throw new NotFoundException(ERROR_SPECIES.SPECIES_NOT_FOUND.MESSAGE);
    }
    return true;
  }

  public async remove(id: number): Promise<boolean> {
    const result = await this.speciesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(ERROR_SPECIES.SPECIES_NOT_FOUND.MESSAGE);
    }
    return true;
  }
}
