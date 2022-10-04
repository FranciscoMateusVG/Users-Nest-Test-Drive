import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportsController } from './reports/controller/reports.controller';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';
import { OrmModule } from './orm/orm.module';
import { User } from './orm/users/user.entity';

const DbModule = TypeOrmModule.forRoot({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [User],
  synchronize: true,
});

@Module({
  imports: [DbModule, UsersModule, ReportsModule, OrmModule],
  controllers: [AppController, ReportsController],
  providers: [AppService],
})
export class AppModule {}
