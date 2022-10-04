import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './reports/report.entity';
import { User } from './users/user.entity';
import { UserRepo } from './users/user.repo';

const UserEntity = TypeOrmModule.forFeature([User]);
const ReportEntity = TypeOrmModule.forFeature([Report]);

@Module({
  imports: [UserEntity, ReportEntity],
  providers: [UserRepo],
  exports: [UserRepo],
})
export class OrmModule {}
