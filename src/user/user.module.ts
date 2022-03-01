import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@/user/user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    // 유저 리포지토리를 사용하기 위해 임포트한다.
    TypeOrmModule.forFeature([ UserRepository, ]),
  ],
  controllers: [ UserController, ],
  providers: [ UserService, ],
})
export class UserModule {}
