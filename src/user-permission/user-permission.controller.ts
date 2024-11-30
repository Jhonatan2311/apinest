import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
} from '@nestjs/common';

import { UserPermissionService } from './user-permission.service';

import { CreateUserPermissionDto } from './dto/create-user-permission.dto';
import { UpdateUserPermissionDto } from './dto/update-user-permission.dto';

@Controller('user-permission')
export class UserPermissionController {
  constructor(private readonly userPermissionService: UserPermissionService) {}

  @Get()
  findAll() {
    return this.userPermissionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userPermissionService.findOne(id);
  }

  @Post()
  create(@Body() createUserPermissionDto: CreateUserPermissionDto) {
    return this.userPermissionService.create(createUserPermissionDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserPermissionDto: UpdateUserPermissionDto,
  ) {
    return this.userPermissionService.update(id, updateUserPermissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userPermissionService.remove(id);
  }
}
