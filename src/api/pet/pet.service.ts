import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PetEntity } from './pet.entity';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { SpeciesEntity } from '../species/species.entity';
import { BreedEntity } from '../breed/breed.entity';
import { IAdminPayload } from 'src/share/common/app.interface';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(PetEntity)
    private petRepository: Repository<PetEntity>,

    @InjectRepository(SpeciesEntity)
    private speciesRepository: Repository<SpeciesEntity>,

    @InjectRepository(BreedEntity)
    private breedRepository: Repository<BreedEntity>,
  ) {}

  async findAll(): Promise<PetEntity[]> {
    return this.petRepository.find({
      relations: ['user', 'species', 'breed'],
    });
  }

  async findOne(id: number): Promise<PetEntity> {
    const pet = await this.petRepository.findOne({
      where: { id },
      relations: ['user', 'species', 'breed'],
    });

    if (!pet) {
      throw new NotFoundException(`Pet with ID ${id} not found`);
    }

    return pet;
  }

  async findByUserId(userId: number): Promise<PetEntity[]> {
    return this.petRepository.find({
      where: { userId: +userId }, // Ensure userId is set
      relations: ['species', 'breed'],
    });
  }

  async create(
    createPetDto: CreatePetDto,
    user: IAdminPayload,
  ): Promise<PetEntity> {
    const { speciesName, breedName } = createPetDto;

    // 1. Kiểm tra species tồn tại
    const species = await this.speciesRepository.findOneBy({
      name: speciesName,
    });
    if (!species) {
      throw new BadRequestException(`Species '${speciesName}' does not exist.`);
    }

    // 2. Kiểm tra breed (nếu có)
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
        throw new BadRequestException(
          `Breed '${breedName}' does not exist in species '${speciesName}'.`,
        );
      }
    }

    // 3. Tạo Pet
    const pet = this.petRepository.create({
      ...createPetDto,
      createdBy: user?.sub,
      speciesId: species.id,
      breedId: breed.id,
    });

    return this.petRepository.save(pet);
  }

  async update(id: number, updatePetDto: UpdatePetDto): Promise<PetEntity> {
    const pet = await this.findOne(id);
    Object.assign(pet, updatePetDto);
    return this.petRepository.save(pet);
  }

  async remove(id: number): Promise<void> {
    const pet = await this.findOne(id);
    await this.petRepository.remove(pet);
  }
}
