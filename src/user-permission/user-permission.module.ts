import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserPermission } from './entities/user-permission.entity';

import { UserPermissionService } from './user-permission.service';

import { UserPermissionController } from './user-permission.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserPermission])],
  controllers: [UserPermissionController],
  providers: [UserPermissionService],
})
export class UserPermissionModule {}
