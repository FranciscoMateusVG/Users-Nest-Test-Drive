import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './common/orm/users/user.entity';
import { UsersController } from './users/controller/users.controller';
import { APP_PIPE } from '@nestjs/core';
const cookieSession = require('cookie-session');

const DbOrmModule = TypeOrmModule.forRoot({
  type: 'sqlite',
  database: 'typeOrm.sqlite',
  entities: [User],
  synchronize: true,
});

@Module({
  imports: [DbOrmModule, UsersModule],
  controllers: [UsersController],
  providers: [
    { provide: APP_PIPE, useValue: new ValidationPipe({ whitelist: true }) },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieSession({ keys: ['asdas'] })).forRoutes('*');
  }
}
