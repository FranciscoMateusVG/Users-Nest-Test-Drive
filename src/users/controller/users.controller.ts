import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UsersService } from '../service/users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body.email, body.password);
  }

  @Get('/users')
  getUsers() {
    return this.usersService.getAll();
  }
}
