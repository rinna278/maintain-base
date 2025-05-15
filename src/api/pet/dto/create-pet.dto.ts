import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreatePetDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  speciesId: number;

  @IsOptional()
  @IsNumber()
  breedId?: number;
}
