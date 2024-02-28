import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user || !(await user.checkPassword(password)))
      throw new UnauthorizedException('Email ou senha inválidos');

    return user;
  }

  async generateAccessToken(user: User): Promise<string> {
    try {
      return this.jwtService.sign({ email: user.email, sub: user.id });
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async refreshAccessToken(user: User): Promise<string> {
    try {
      return this.jwtService.sign({ email: user.email, sub: user.id });
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
