import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepo } from './users/user.repo';

@Module({
  providers: [UserRepo, PrismaService],
  exports: [UserRepo],
})
export class PrismaModule {}
