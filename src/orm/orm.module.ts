import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './reports/report.entity';
import { User } from './users/user.entity';

const UserEntity = TypeOrmModule.forFeature([User]);
const ReportEntity = TypeOrmModule.forFeature([Report]);

@Module({
  imports: [TypeOrmModule],
  exports: [UserEntity, ReportEntity],
})
export class OrmModule {}
