import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';

import { UserPermissionService } from './user-permission.service';
import { UserPermission } from './entities/user-permission.entity';
import { UserPermissionController } from './user-permission.controller';

describe('UserController', () => {
  let controller: UserPermissionController;
  let service: UserPermissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserPermissionController],
      providers: [
        UserPermissionService,
        {
          provide: getRepositoryToken(UserPermissionService),
          useValue: {
            findOne: jest.fn(),
            find: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(UserPermission),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserPermissionController>(UserPermissionController);
    service = module.get<UserPermissionService>(UserPermissionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
