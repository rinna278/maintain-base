import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorRequestEntity } from './doctor-request.entity';
import { DoctorRequestService } from './doctor-request.service';
import { DoctorRequestController } from './doctor-request.controller';
import { UserEntity } from '../user/user.entity';
import { RoleEntity } from '../role/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DoctorRequestEntity, UserEntity, RoleEntity]),
  ],
  providers: [DoctorRequestService],
  controllers: [DoctorRequestController],
})
export class DoctorRequestModule {}
