import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  payload = (user: User): Partial<User> => ({
    id: user.id,
    username: user.username,
    email: user.email,
  });

  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<Partial<User>> {
    const user = await this.usersService.create(createUserDto);

    return this.payload(user);
  }

  @UseGuards(JwtGuard)
  @Get()
  async findAll() {
    const users = await this.usersService.findAll();

    return users.map((user: User) => this.payload(user));
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.payload(await this.usersService.findOne(+id));
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.payload(await this.usersService.update(+id, updateUserDto));
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
