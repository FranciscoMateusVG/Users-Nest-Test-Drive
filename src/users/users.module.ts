import { Module } from '@nestjs/common';
import { OrmModule } from 'src/orm/orm.module';
import { UsersController } from './controller/users.controller';
import { UsersService } from './service/users.service';

@Module({
  imports: [OrmModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
