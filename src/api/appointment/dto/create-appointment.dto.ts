import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import dayjs from '../../../share/utils/dayjs';

export class CreateAppointmentDto {
  @IsOptional()
  @IsString()
  symptom?: string;

  @IsNotEmpty()
  @Transform(({ value }) => {
    if (value instanceof Date) {
      return value;
    }

    if (typeof value === 'string') {
      const parsed = dayjs.tz(value, 'DD/MM/YYYY HH:mm:ss', 'Asia/Ho_Chi_Minh');
      if (!parsed.isValid()) {
        throw new Error(`Invalid date format: ${value}`);
      }
      return parsed.toDate();
    }

    throw new Error(`Invalid type: ${typeof value}, expected string or Date`);
  })
  @IsDate()
  appointmentTime: Date;

  @IsNotEmpty()
  @IsNumber()
  petId: number;
}
