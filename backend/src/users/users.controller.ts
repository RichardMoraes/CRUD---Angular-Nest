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

export interface AuthResponse {
  status: string;
  data?: Partial<User> | Partial<User[]> | { access_token: string };
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<AuthResponse> {
    const user = await this.usersService.create(createUserDto);

    return {
      status: 'success',
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  }

  @UseGuards(JwtGuard)
  @Get()
  async findAll(): Promise<AuthResponse> {
    const users = (await this.usersService.findAll()).map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ password, ...user }) => user as User,
    );

    return {
      status: 'success',
      data: users,
    };
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);

    return {
      status: 'success',
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(+id, updateUserDto);

    return {
      status: 'success',
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usersService.remove(+id);

    return {
      status: 'success',
    };
  }
}
