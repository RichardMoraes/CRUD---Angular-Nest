import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { User } from 'src/users/entities/user.entity';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<Partial<User>> {
    if (!email || !password)
      throw new UnprocessableEntityException('Email or password invalid');

    return await this.authService.authUser(email, password);
  }
}
