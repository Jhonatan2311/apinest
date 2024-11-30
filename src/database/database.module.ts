import 'dotenv/config';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { User } from '../user/entities/user.entity';
import { UserPermission } from '../user-permission/entities/user-permission.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => {
        const isLocal = configService.get<string>('NODE_ENV') === 'development';

        return {
          type: configService.get<'mysql' | 'mariadb' | 'postgres'>('DB_TYPE'),
          host: configService.get<string>('DB_HOST'),
          port: Number(configService.get<number>('DB_PORT')),
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASS'),
          database: configService.get<string>('DB_NAME'),
          entities: [User, UserPermission],
          synchronize: true,
          ssl: isLocal ? false : { rejectUnauthorized: false },
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
