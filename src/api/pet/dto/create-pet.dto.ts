import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePetDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  @IsString()
  speciesName?: string;

  @IsOptional()
  @Transform(({ value }) => (value === null ? undefined : value))
  @IsString()
  breedName?: string;
}
