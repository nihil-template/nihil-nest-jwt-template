import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from '@/entities/user.entity';

@Module({
  imports: [
    // 유저 리포지토리를 사용하기 위해 임포트한다.
    TypeOrmModule.forFeature([ User, ]),
  ],
  controllers: [ UserController, ],
  providers: [ UserService, ],
})
export class UserModule {}
