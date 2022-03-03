import {
  Body, Controller, Get, Post, Res, UseGuards, UsePipes, ValidationPipe
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '@/auth/auth.service';
import { CreateUserDto } from '@/user/dto/create.user.dto';
import { LocalAuthGuard } from '@/auth/local.auth.guard';
import { UserWithOutPassword } from '@/types/user.types';
import { GetUser } from './get.user.decorator';
import { JwtAuthGuard } from '@/auth/jwt.auth.guard';

@Controller('auth')
export class AuthController {
  // eslint-disable-next-line no-unused-vars
  constructor(private authService: AuthService) {}

  // 유저를 생성하는 엔드포인트.
  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true, }))
  async register(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.authService.register(createUserDto);
  }

  // 로그인 엔드포인트. 로그인을 하면 인증 토큰을 발급한다.
  @UseGuards(LocalAuthGuard)
  @Post('sighin')
  async sighIn(
    @GetUser() user: UserWithOutPassword,
    @Res() res: Response
  ): Promise<void> {
    return this.authService.sighIn(user, res);
  }

  // 발급된 토큰이 있어야지만 로그아웃이 가능하도록 만든다.
  @UseGuards(JwtAuthGuard)
  @Post('sighout')
  sighOut(@Res() res: Response): void {
    return this.authService.sighOut(res);
  }

  // 자신에 대한 정보는 반드시 토큰을 통해서만 접근할 수 있다.
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@GetUser() user: UserWithOutPassword): UserWithOutPassword {
    return user;
  }
}
