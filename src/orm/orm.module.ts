import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';

const UserEntity = TypeOrmModule.forFeature([User]);

@Module({
  imports: [TypeOrmModule],
  exports: [UserEntity],
})
export class OrmModule {}
