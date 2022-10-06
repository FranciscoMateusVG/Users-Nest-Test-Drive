import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { createMock } from '@golevelup/ts-jest';
import { HashingService } from './hashing.service';
import { AuthService } from './auth.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker';

describe('AuthService', () => {
  let authService: AuthService;
  let fakeUsersService: UsersService;
  let fakeHashingService: HashingService;

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
    fakeHashingService = module.get<HashingService>(HashingService);
  });

  it('SignUp ---> throws an error if user signs up with email that is in use', async () => {
    const randomEmail = faker.internet.email();
    const randomPassword = faker.internet.password();
    fakeUsersService.find = jest.fn().mockReturnValue(randomEmail);

    await expect(
      authService.signUp(randomEmail, randomPassword),
    ).rejects.toThrow(BadRequestException);
  });

  it('SignUp ---> should not throw an error if no user is found', async () => {
    const randomEmail = faker.internet.email();
    const randomPassword = faker.internet.password();
    fakeUsersService.find = jest.fn().mockReturnValue('');

    await expect(
      authService.signUp(randomEmail, randomPassword),
    ).resolves.not.toThrowError(BadRequestException);
  });

  it('SignIn ---> should  throw an error if no user is found', async () => {
    const randomEmail = faker.internet.email();
    const randomPassword = faker.internet.password();
    fakeUsersService.find = jest
      .fn()
      .mockReturnValue(new Promise((resolve) => resolve([])));

    await expect(
      authService.signIn(randomEmail, randomPassword),
    ).rejects.toThrowError(NotFoundException);
  });

  it('SignIn ---> should  throw an error if no user is found', async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    fakeUsersService.find = jest
      .fn()
      .mockReturnValue(
        new Promise((resolve) => resolve([{ email, password }])),
      );

    fakeHashingService.validateHash = jest
      .fn()
      .mockReturnValue(new Promise((resolve) => resolve(false)));

    await expect(authService.signIn(email, password)).rejects.toThrowError(
      BadRequestException,
    );
  });
});
