import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { RoleEntity } from '../role/role.entity';
import { RoleModule } from '../role/role.module';
import { PetEntity } from '../pet/pet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity, PetEntity]), RoleModule],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
