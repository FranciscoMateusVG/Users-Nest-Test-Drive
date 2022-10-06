import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsController } from './reports/controller/reports.controller';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';
import { User } from './orm/users/user.entity';
import { Report } from './orm/reports/report.entity';
import { UsersController } from './users/controller/users.controller';
import { APP_PIPE } from '@nestjs/core';
const cookieSession = require('cookie-session');

const DbOrmModule = TypeOrmModule.forRoot({
  type: 'sqlite',
  database: 'typeOrm.sqlite',
  entities: [User, Report],
  synchronize: true,
});

@Module({
  imports: [DbOrmModule, UsersModule, ReportsModule],
  controllers: [ReportsController, UsersController],
  providers: [
    { provide: APP_PIPE, useValue: new ValidationPipe({ whitelist: true }) },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieSession({ keys: ['asdas'] })).forRoutes('*');
  }
}
