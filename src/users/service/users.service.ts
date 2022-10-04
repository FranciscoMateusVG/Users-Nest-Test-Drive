import { Injectable } from '@nestjs/common';
import { InjectRepository as IR } from '@nestjs/typeorm';
import { User } from '../../orm/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@IR(User) private repo: Repository<User>) {}
}
