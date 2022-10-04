import { Module } from '@nestjs/common';
import { OrmModule } from 'src/orm/orm.module';
import { ReportsController } from './controller/reports.controller';
import { ReportsService } from './service/reports.service';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService],
  imports: [OrmModule],
})
export class ReportsModule {}
