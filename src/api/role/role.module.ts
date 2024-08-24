import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleService } from './role.service';
import { PermissionEntity } from '../permission/permission.entity';
import { RoleEntity } from './role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity, PermissionEntity])],
  controllers: [],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
