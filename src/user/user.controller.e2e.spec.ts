import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource, DataSourceOptions } from 'typeorm';
import { HttpStatus, INestApplication } from '@nestjs/common';

import { UserModule } from './user.module';

import { User } from './entities/user.entity';
import { UserPermission } from '../user-permission/entities/user-permission.entity';

describe('UserController E2E tests', () => {
  let app: INestApplication;
  let module: TestingModule;
  let data: any;
  let users: User[];

  const dataSourceTest: DataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [User, UserPermission],
    synchronize: true,
  };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        UserModule,
        TypeOrmModule.forRootAsync({
          useFactory: async () => {
            return dataSourceTest;
          },
        }),
      ],
    }).compile();
    app = module.createNestApplication();
    await app.init();

    data = {
      name: 'New User',
      email: `${uuidv4()}@email.com`,
      password: '123456',
      permission: '55715989-2154-4048-b2ef-9da4958ced9a',
    };
  });

  beforeEach(async () => {
    const dataSource = await new DataSource(dataSourceTest).initialize();
    const repository = dataSource.getRepository(User);
    users = await repository.find();
    await dataSource.destroy();
  });

  afterAll(async () => {
    await module.close();
  });

  describe('POST /users', () => {
    it('should create a user', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send(data)
        .expect(HttpStatus.CREATED);

      const user: User = response.body;

      expect(user.id).toBeDefined();
      expect(user.name).toEqual(data.name);
      expect(user.createdAt).toBeDefined();
    });
  });

  describe('GET /users', () => {
    it('should list all users', async () => {
      const response = await request(app.getHttpServer())
        .get('/users')
        .expect(HttpStatus.OK);

      const users: User[] = response.body;

      expect(Array.isArray(users)).toBe(true);
      expect(users.length).toBeGreaterThan(0);

      const user = users[0];
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('password');
    });
  });

  describe('GET /users/:id', () => {
    it('should gets a user by id', async () => {
      const response = await request(app.getHttpServer())
        .get(`/users/${users[0].id}`)
        .expect(HttpStatus.OK);

      const user: User = response.body;

      expect(user.id).toEqual(users[0].id);
      expect(user.name).toEqual(users[0].name);
      expect(user.email).toEqual(users[0].email);
      expect(user.password).toEqual(users[0].password);
    });
  });

  describe('PATCH /users/:id', () => {
    it('should update a user', async () => {
      const updateData = {
        name: 'User Name Updated',
      };

      const response = await request(app.getHttpServer())
        .patch(`/users/${users[0].id}`)
        .send(updateData)
        .expect(HttpStatus.OK);

      const user: User = response.body;

      expect(user.id).toEqual(users[0].id);
      expect(user.name).toEqual('User Name Updated');
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete a user', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/users/${users[0].id}`)
        .expect(HttpStatus.NO_CONTENT)
        .expect({});
    });
  });
});
