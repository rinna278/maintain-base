import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBreedDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  speciesId: number;
}
