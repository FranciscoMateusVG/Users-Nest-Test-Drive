import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../service/auth/auth.service';
import { UsersController } from './users.controller';
import { createMock } from '@golevelup/ts-jest';
import { UsersService } from '../service/users/users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: AuthService, useValue: createMock<AuthService>() },
        { provide: UsersService, useValue: createMock<UsersService>() },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
