import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    // TODO: Set to dotenv
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'rKWr9Wp3dcU2hX8w@*9a4$Mz2uTYMhB',
    });
  }

  async validate(payload: any) {
    return { user: payload.sub, username: payload.username };
  }
}
