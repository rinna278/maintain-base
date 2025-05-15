import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdatePetDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  speciesId?: number;

  @IsOptional()
  @IsNumber()
  breedId?: number;

  @IsOptional()
  @IsNumber()
  status?: number;
}
