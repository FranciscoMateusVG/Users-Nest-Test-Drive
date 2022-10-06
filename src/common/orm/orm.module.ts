import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UserRepo } from './users/user.repo';

const UserEntity = TypeOrmModule.forFeature([User]);

@Module({
  imports: [UserEntity],
  providers: [UserRepo],
  exports: [UserRepo],
})
export class OrmModule {}
