import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';

const strategies = [LocalStrategy, JwtStrategy, JwtRefreshStrategy];

@Module({
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      // TODO: Set to dotenv
      secret: 'rKWr9Wp3dcU2hX8w@*9a4$Mz2uTYMhB',
      // TODO: Set to dotenv
      signOptions: { expiresIn: '30s' },
    }),
    PassportModule,
  ],
  providers: [AuthService, UsersService, ...strategies],
})
export class AuthModule {}
