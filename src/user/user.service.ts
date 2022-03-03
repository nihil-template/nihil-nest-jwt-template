import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@/user/user.repository';
import { CreateUserDto } from '@/user/dto/create.user.dto';
import { UserWithOutPassword } from '@/types/user.types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    // eslint-disable-next-line no-unused-vars
    private userRepository: UserRepository
  ) {}

  // 유저를 생성한다.
  async createUser(createUserDto: CreateUserDto): Promise<void> {
    return this.userRepository.createUser(createUserDto);
  }

  // 유저를 불러온다.
  async getUser(username: string): Promise<UserWithOutPassword> {
    const user = await this.userRepository.findOne({
      where: { username, },
    });

    const { password, ...userWithOutPassword } = user;

    if (!user) {
      throw new HttpException({
        message: '사용자가 존재하지 않습니다.',
      }, HttpStatus.NOT_FOUND);
    } else {
      return userWithOutPassword;
    }
  }
}
