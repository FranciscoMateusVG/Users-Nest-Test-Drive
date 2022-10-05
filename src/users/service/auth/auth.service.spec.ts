import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { createMock } from '@golevelup/ts-jest';
import { HashingService } from './hashing.service';
import { AuthService } from './auth.service';
import { User } from '../../../orm/users/user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker';

describe('AuthService', () => {
  let authService: AuthService;
  let fakeUsersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: createMock<UsersService>() },
        { provide: HashingService, useValue: createMock<HashingService>() },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    fakeUsersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', async () => {
    const randomEmail = faker.internet.email();
    const randomPassword = faker.internet.password();
    fakeUsersService.find = jest.fn().mockReturnValue(randomEmail);

    await expect(
      authService.signUp(randomEmail, randomPassword),
    ).rejects.toThrow(BadRequestException);
  });

  it('should not throw an error if no user is found', async () => {
    const randomEmail = faker.internet.email();
    const randomPassword = faker.internet.password();
    fakeUsersService.find = jest.fn().mockReturnValue('');

    await expect(
      authService.signUp(randomEmail, randomPassword),
    ).resolves.not.toThrowError(BadRequestException);
  });
});
