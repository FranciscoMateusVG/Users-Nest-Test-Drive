import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../service/auth/auth.service';
import { UsersController } from './users.controller';
import { createMock } from '@golevelup/ts-jest';
import { UsersService } from '../service/users/users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let fakeAuthService: AuthService;
  let fakeUsersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: AuthService, useValue: createMock<AuthService>() },
        { provide: UsersService, useValue: createMock<UsersService>() },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    fakeAuthService = module.get<AuthService>(AuthService);
    fakeUsersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });
});
