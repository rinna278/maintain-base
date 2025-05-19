import { IsOptional, IsString } from 'class-validator';

export class CreateDoctorRequestDto {
  @IsOptional()
  @IsString()
  cv?: string;
}
