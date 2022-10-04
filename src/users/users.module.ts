import { Module } from '@nestjs/common';
import { OrmModule } from 'src/orm/orm.module';
import { UsersController } from './controller/users.controller';
import { UsersService } from './service/users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [OrmModule],
})
export class UsersModule {}
