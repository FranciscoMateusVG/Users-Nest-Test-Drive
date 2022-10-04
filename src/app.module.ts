import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsController } from './reports/controller/reports.controller';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';
import { OrmModule } from './orm/orm.module';
import { User } from './orm/users/user.entity';
import { Report } from './orm/reports/report.entity';
import { UsersController } from './users/controller/users.controller';

const DbModule = TypeOrmModule.forRoot({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [User, Report],
  synchronize: true,
});

@Module({
  imports: [DbModule, UsersModule, ReportsModule, OrmModule],
  controllers: [ReportsController, UsersController],
})
export class AppModule {}
