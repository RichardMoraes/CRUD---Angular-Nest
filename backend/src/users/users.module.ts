import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      // TODO: Set to dotenv
      secret: 'rKWr9Wp3dcU2hX8w@*9a4$Mz2uTYMhB',
      // TODO: Set to dotenv
      signOptions: { expiresIn: '5m' },
    }),
  ],
  providers: [UsersService, AuthService],
  exports: [UsersModule],
})
export class UsersModule {}
