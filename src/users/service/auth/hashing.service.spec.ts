import { Test, TestingModule } from '@nestjs/testing';
import { HashingService } from './hashing.service';

describe('AuthService', () => {
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

  it('should be defined', () => {});
});
