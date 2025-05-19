import { IsEnum, IsOptional } from 'class-validator';
import { DoctorRequestStatus } from '../doctor-request.constant';

export class FilterDoctorRequestDto {
  @IsOptional()
  @IsEnum(DoctorRequestStatus)
  status?: DoctorRequestStatus;
}
