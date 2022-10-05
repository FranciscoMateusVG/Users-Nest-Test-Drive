import { Module } from '@nestjs/common';
import { OrmModule } from 'src/orm/orm.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersController } from './controller/users.controller';

import { AuthService } from './service/auth/auth.service';
import { HashingService } from './service/auth/hashing.service';
import { UsersService } from './service/users/users.service';

@Module({
  imports: [OrmModule, PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, AuthService, HashingService],
  exports: [UsersService, AuthService],
})
export class UsersModule {}
