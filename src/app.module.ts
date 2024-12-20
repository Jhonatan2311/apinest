import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { UserPermissionModule } from './user-permission/user-permission.module';

import { AppController } from './app.controller';

import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    UserPermissionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
