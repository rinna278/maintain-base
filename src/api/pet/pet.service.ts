import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PetEntity } from './pet.entity';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(PetEntity)
    private petRepository: Repository<PetEntity>,
  ) {}

  async findAll(): Promise<PetEntity[]> {
    return this.petRepository.find({
      relations: ['user', 'species', 'breed'],
    });
  }

  async findOne(id: string): Promise<PetEntity> {
    const pet = await this.petRepository.findOne({
      where: { id },
      relations: ['user', 'species', 'breed'],
    });

    if (!pet) {
      throw new NotFoundException(`Pet with ID ${id} not found`);
    }

    return pet;
  }

  async findByUserId(userId: string): Promise<PetEntity[]> {
    return this.petRepository.find({
      where: { userId: +userId }, // Ensure userId is set
      relations: ['species', 'breed'],
    });
  }

  async create(createPetDto: CreatePetDto): Promise<PetEntity> {
    createPetDto.userId = +createPetDto.userId || null; // Ensure userId is set
    const pet = this.petRepository.create(createPetDto);
    return this.petRepository.save(pet);
  }

  async update(id: string, updatePetDto: UpdatePetDto): Promise<PetEntity> {
    const pet = await this.findOne(id);
    Object.assign(pet, updatePetDto);
    return this.petRepository.save(pet);
  }

  async remove(id: string): Promise<void> {
    const pet = await this.findOne(id);
    await this.petRepository.remove(pet);
  }
}
