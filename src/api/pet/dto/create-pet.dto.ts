import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreatePetDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  speciesName: string;

  @IsOptional()
  @IsString()
  breedName: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
