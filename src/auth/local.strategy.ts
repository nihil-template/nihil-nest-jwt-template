import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserWithOutPassword } from '@/types/user.types';

// LocalAuthGuard의 실질적인 구현에 해당한다.
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  // eslint-disable-next-line no-unused-vars
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  // 검증에 성공하면 리퀘스트에 유저 정보를 넣어준다.
  async validate(username: string, password: string): Promise<UserWithOutPassword> {
    const user = await this.authService.validateUser({ username, password, });

    if (!user) {
      throw new HttpException({
        message: '아이디 혹은 비밀번호가 일치하지 않습니다.',
      }, HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}
