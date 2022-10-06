import { Injectable } from '@nestjs/common';
import { User } from 'src/orm/users/user.entity';
//import { UserRepo } from 'src/orm/users/user.repo';
import { UserRepo } from 'src/prisma/users/user.repo';

@Injectable()
export class UsersService {
  constructor(private userRepo: UserRepo) {}

  createUser(email: string, password: string) {
    return this.userRepo.create(email, password);
  }

  getAll() {
    return this.userRepo.getAll();
  }

  findOne(id: number) {
    if (!id) return null;
    return this.userRepo.findOne(id);
  }

  find(email: string) {
    return this.userRepo.find(email);
  }

  update(id: number, attrs: Partial<User>) {
    return this.userRepo.update(id, attrs);
  }

  remove(id: number) {
    return this.userRepo.remove(id);
  }
}
