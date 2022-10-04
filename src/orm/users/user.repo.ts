import { Injectable } from '@nestjs/common';
import { InjectRepository as IR } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserRepo {
  constructor(@IR(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }

  getAll() {
    return this.repo.find();
  }
}
