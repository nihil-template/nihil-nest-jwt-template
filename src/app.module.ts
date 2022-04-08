import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Joi from '@hapi/joi';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // 환경변수에 대한 타입과 필수 여부를 정의한다.
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXP: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      // 환경변수 모듈을 임포트하고 사용할 수 있다.
      imports: [ ConfigModule, ],
      inject: [ ConfigService, ],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        // 다음과 같이 환경변수를 사용한다.
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [ `${__dirname}/**/*.{js,ts}`, ],
        synchronize: true,
      }),
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
