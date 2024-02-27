import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as express from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private usersService: UsersService) {
    // TODO: Set to dotenv
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: express.Request) => {
          return request.cookies['refresh_token'];
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: 'rKWr9Wp3dcU2hX8w@*9a4$Mz2uTYMhB',
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.findOne(parseInt(payload.sub));

    if (!user) throw new UnauthorizedException('Invalid refresh token');

    return user;
  }
}
