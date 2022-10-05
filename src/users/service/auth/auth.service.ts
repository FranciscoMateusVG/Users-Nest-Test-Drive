import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { HashingService } from './hashing.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private hashingService: HashingService,
  ) {}

  async signUp(email: string, password: string) {
    const users = await this.usersService.find(email);

    if (users.length) {
      throw new BadRequestException('Email in use');
    }

    const hashedPassword = await this.hashingService.hash(password);

    const user = await this.usersService.createUser(email, hashedPassword);

    return user;
  }

  async signIn(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const hashValid = await this.hashingService.validateHash(user, password);

    if (!hashValid) throw new BadRequestException('Invalid password');

    return user;
  }
}
