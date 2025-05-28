import { IsNumber } from 'class-validator';

export class ConfirmAppointmentDto {
  @IsNumber()
  status: number;
}
