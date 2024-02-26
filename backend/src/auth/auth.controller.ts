import {
  Get,
  Post,
  Controller,
  UseGuards,
  Req,
  Res,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import * as express from 'express';
import { User } from 'src/users/entities/user.entity';
import { JwtRefreshGuard } from './guards/jwt-refresh-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtGuard } from './guards/jwt-auth.guard';
import { AuthResponseDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @UseGuards(JwtGuard)
  @Get('check')
  async checkToken(): Promise<AuthResponseDto> {
    return {
      status: 'success',
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req() req: any,
    @Res({ passthrough: true }) response: express.Response,
  ): Promise<AuthResponseDto> {
    delete req.user.password;

    try {
      response.cookie(
        'refresh_token',
        this.jwtService.sign(
          { email: req.user.email, sub: req.user.id },
          // TODO: Set to dotenv
          { expiresIn: '15m' },
        ),
        { httpOnly: true },
      );

      return {
        status: 'success',
        data: {
          ...req.user,
          access_token: this.jwtService.sign({
            email: req.user.email,
            sub: req.user.id,
          }),
        },
      };
    } catch (error) {
      throw new UnprocessableEntityException();
    }
  }

  @UseGuards(JwtGuard)
  @Get('logout')
  async logout(
    @Res({ passthrough: true }) response: express.Response,
  ): Promise<AuthResponseDto> {
    try {
      response.cookie('refresh_token', '', {
        expires: new Date(0),
        httpOnly: true,
      });

      return { status: 'success' };
    } catch (error) {
      throw new UnprocessableEntityException();
    }
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refreshToken(
    @Req() req: any,
    @Res({ passthrough: true }) response: express.Response,
  ): Promise<Partial<AuthResponseDto>> {
    try {
      response.cookie(
        'refresh_token',
        this.jwtService.sign(
          { email: req.user.email, sub: req.user.id },
          // TODO: Set to dotenv
          { expiresIn: '15m' },
        ),
        { httpOnly: true },
      );
    } catch (error) {
      throw new UnprocessableEntityException();
    }

    return {
      status: 'success',
      data: {
        access_token: await this.authService.refreshAccessToken(req.user),
      },
    };
  }
}
