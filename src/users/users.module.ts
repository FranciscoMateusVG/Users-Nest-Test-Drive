import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserInterceptor } from 'src/common/interceptors/current-user.interceptor';
import { OrmModule } from 'src/common/orm/orm.module';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { UsersController } from './controller/users.controller';

import { AuthService } from './service/auth/auth.service';
import { HashingService } from './service/auth/hashing.service';
import { UsersService } from './service/users/users.service';

@Module({
  imports: [OrmModule, PrismaModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    HashingService,
    { provide: APP_INTERCEPTOR, useClass: CurrentUserInterceptor },
  ],
  exports: [UsersService, AuthService],
})
export class UsersModule {}
