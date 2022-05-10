import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '@/user/user.service';
import { LocalStrategy } from '@/auth/local.strategy';
import { JwtStrategy } from '@/auth/jwt.strategy';
import { User } from '@/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ User, ]),
    // 패스포트를 위해 필요하다.
    PassportModule,
    // 인증을 위해 필요하다.
    JwtModule.registerAsync({
      imports: [ ConfigModule, ],
      inject: [ ConfigService, ],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXP'),
        },
      }),
    }),
  ],
  controllers: [ AuthController, ],
  // 두가지의 전략을 추가해준다.
  providers: [ AuthService, UserService, LocalStrategy, JwtStrategy, ],
})
export class AuthModule {}
