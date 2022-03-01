import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { IPayload } from '@/types/user.types';
import { UserService } from '@/user/user.service';

// JwtAuthGuard의 실질적인 구현에 해당한다.
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    // eslint-disable-next-line no-unused-vars
    private configService: ConfigService,
    // eslint-disable-next-line no-unused-vars
    private userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      ignoreExpiration: true,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  // 검증에 성공하면 유저 정보를 리턴해준다.
  async validate(payload: IPayload) {
    return this.userService.getUser(payload.username);
  }
}
