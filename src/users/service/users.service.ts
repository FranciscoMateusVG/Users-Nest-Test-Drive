import { Injectable } from '@nestjs/common';
import { UserRepo } from '../../orm/users/user.repo';
//import { UserRepo } from '../../prisma/users/user.repo';

@Injectable()
export class UsersService {
  constructor(private userRepo: UserRepo) {}

  createUser(email: string, password: string) {
    return this.userRepo.create(email, password);
  }

  getAll() {
    return this.userRepo.getAll();
  }
}
