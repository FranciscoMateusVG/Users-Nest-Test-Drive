import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { createMock } from '@golevelup/ts-jest';
import { HashingService } from './hashing.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: createMock<UsersService>() },
        { provide: HashingService, useValue: createMock<HashingService>() },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should be defined', () => {});
});
