import { Test, TestingModule } from '@nestjs/testing';
import { HashingService } from './hashing.service';
import { faker } from '@faker-js/faker';
import { User } from '../../../common/orm/users/user.entity';

describe('HashingService', () => {
  let hashingService: HashingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HashingService],
    }).compile();

    hashingService = module.get<HashingService>(HashingService);
  });

  it('should be defined', () => {
    expect(hashingService).toBeDefined();
  });

  it('creates a hashed password', async () => {
    const randomPassword = faker.internet.password();
    const hashedPassword = await hashingService.hash(randomPassword);
    expect(hashedPassword).not.toEqual(randomPassword);
    expect(hashedPassword.length).toEqual(81);
  });

  it('validate hash should return true if validated', async () => {
    const randomPassword = faker.internet.password();
    const hashedPassword = await hashingService.hash(randomPassword);
    const user: User = {
      email: 'random_email',
      password: hashedPassword,
      id: 1,
    };

    const hashValid = await hashingService.validateHash(user, randomPassword);

    expect(hashValid).toBeTruthy();
  });

  it('validate hash should return false if not validated', async () => {
    const randomPassword = faker.internet.password();
    const hashedPassword = await hashingService.hash(randomPassword);
    const user: User = {
      email: 'random_email',
      password: hashedPassword,
      id: 1,
    };

    const hashValid = await hashingService.validateHash(user, 'WrongPassword');

    expect(hashValid).toBeFalsy();
  });
});
