import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportsController } from './reports/controller/reports.controller';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, ReportsModule],
  controllers: [AppController, ReportsController],
  providers: [AppService],
})
export class AppModule {}
