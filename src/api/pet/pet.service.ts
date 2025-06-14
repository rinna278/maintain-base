import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { PetEntity } from './pet.entity';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { SpeciesEntity } from '../species/species.entity';
import { BreedEntity } from '../breed/breed.entity';
import { IAdminPayload, IPaginateParams } from 'src/share/common/app.interface';
import { ERROR_PET } from './pet.constant';
import { BaseService } from 'src/share/database/base.service';
import { StringUtil } from 'src/share/utils/string.util';

@Injectable()
export class PetService extends BaseService<PetEntity> {
  constructor(
    @InjectRepository(PetEntity)
    private petRepository: Repository<PetEntity>,

    @InjectRepository(SpeciesEntity)
    private speciesRepository: Repository<SpeciesEntity>,

    @InjectRepository(BreedEntity)
    private breedRepository: Repository<BreedEntity>,
  ) {
    super(petRepository);
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

  async findOne(id: number): Promise<PetEntity> {
    const pet = await this.petRepository.findOne({
      where: { id },
    });

    if (!pet) {
      throw new NotFoundException(ERROR_PET.PET_NOT_FOUND.MESSAGE);
    }

    return pet;
  }

  async findByUserId(userId: number): Promise<PetEntity[]> {
    return this.petRepository.find({
      where: { userId: userId },
    });
  }

  async createPet(
    createPetDto: CreatePetDto,
    user: IAdminPayload,
  ): Promise<PetEntity> {
    const { speciesName, breedName } = createPetDto;

    const species = await this.speciesRepository.findOneBy({
      name: speciesName,
    });
    if (!species) {
      throw new NotFoundException(ERROR_PET.PET_NOT_FOUND.MESSAGE);
    }

    let breed: BreedEntity = null;
    if (breedName) {
      breed = await this.breedRepository.findOne({
        where: {
          name: breedName,
          species: { id: species.id },
        },
        relations: ['species'],
      });

      if (!breed) {
        throw new NotFoundException(ERROR_PET.PET_NOT_FOUND.MESSAGE);
      }
    }

    const pet = this.petRepository.create({
      ...createPetDto,
      userId: user?.sub,
      speciesId: species.id,
      breedId: breed.id,
    });

    return this.petRepository.save(pet);
  }

  async updatePet(id: number, updatePetDto: UpdatePetDto): Promise<any> {
    return this.update(id, updatePetDto);
  }

  async remove(id: number): Promise<void> {
    const pet = await this.findOne(id);
    await this.petRepository.remove(pet);
  }
}
