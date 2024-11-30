import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserPermission } from './entities/user-permission.entity';

import { CreateUserPermissionDto } from './dto/create-user-permission.dto';
import { UpdateUserPermissionDto } from './dto/update-user-permission.dto';

@Injectable()
export class UserPermissionService {
  @InjectRepository(UserPermission)
  private readonly userPermissionRepository: Repository<UserPermission>;

  async findAll(): Promise<UserPermission[]> {
    return this.userPermissionRepository.find();
  }

  async findOne(id: string): Promise<UserPermission> {
    return this.userPermissionRepository.findOne({ where: { id } });
  }

  async create(
    createUserDto: CreateUserPermissionDto,
  ): Promise<UserPermission> {
    const user = this.userPermissionRepository.create(createUserDto);
    return this.userPermissionRepository.save(user);
  }

  async update(
    id: string,
    updateUserPermissionDto: UpdateUserPermissionDto,
  ): Promise<UserPermission> {
    const user = await this.userPermissionRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }

    Object.assign(user, updateUserPermissionDto);

    return this.userPermissionRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.userPermissionRepository.delete(id);
  }
}
