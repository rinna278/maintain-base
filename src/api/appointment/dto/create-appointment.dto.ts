import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
  IsNumber,
} from 'class-validator';

export class CreateAppointmentDto {
  @IsOptional()
  @IsString()
  symptom?: string;

  @IsNotEmpty()
  @IsDateString()
  appointmentTime: string;

  @IsNotEmpty()
  @IsNumber()
  petId: number;
}
