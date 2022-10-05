import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsController } from './reports/controller/reports.controller';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';
import { User } from './orm/users/user.entity';
import { Report } from './orm/reports/report.entity';
import { UsersController } from './users/controller/users.controller';

const DbOrmModule = TypeOrmModule.forRoot({
  type: 'sqlite',
  database: 'typeOrm.sqlite',
  entities: [User, Report],
  synchronize: true,
});

@Module({
  imports: [DbOrmModule, UsersModule, ReportsModule],
  controllers: [ReportsController, UsersController],
})
export class AppModule {}
