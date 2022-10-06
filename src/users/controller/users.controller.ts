import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { Serialize } from '../../common/interceptors/serialize.interceptor';
import { UserDto } from '../dtos/user.dto';
import { UsersService } from '../service/users/users.service';
import { AuthService } from '../service/auth/auth.service';
import { CurrentUser } from '../decorators/current-user.decorator';
import { User } from '../../common/orm/users/user.entity';
import { AuthGuard } from '../../common/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('/users')
  getUsers() {
    return this.usersService.getAll();
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id));
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Get('/whoami')
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Get('/guardtest')
  @UseGuards(AuthGuard)
  guardTest(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signUp(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signout')
  async signOut(@Session() session: any) {
    session.userId = null;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signIn(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Put('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
}
