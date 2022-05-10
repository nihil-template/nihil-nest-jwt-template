import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '@/user/dto/create.user.dto';
import { UserWithOutPassword } from '@/types/user.types';
import { User } from '@/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    // eslint-disable-next-line no-unused-vars
    private userRepository: Repository<User>
  ) {}

  // 유저를 생성한다.
  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const { username, password, email, } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    if (username.includes(' ')) {
      throw new HttpException({
        message: '아이디에는 공백을 넣을 수 없습니다.',
      }, HttpStatus.BAD_REQUEST);
    }

    const userNameCheck = await this.userRepository.find({
      where: { username, },
    });
    const emailCheck = await this.userRepository.find({
      where: { email, },
    });

    if (userNameCheck.length > 0 && emailCheck.length > 0) {
      throw new HttpException({
        message: '사용되고 있는 아이디와 이메일입니다.',
      }, HttpStatus.CONFLICT);
    } else if (emailCheck.length > 0) {
      throw new HttpException({
        message: '사용되고 있는 이메일입니다.',
      }, HttpStatus.CONFLICT);
    } else if (userNameCheck.length > 0) {
      throw new HttpException({
        message: '사용되고 있는 아이디입니다.',
      }, HttpStatus.CONFLICT);
    } else {
      const user = this.userRepository.create({
        username,
        password: hashedPassword,
        email,
      });

      await this.userRepository.save(user);

      throw new HttpException({
        message: '회원가입이 완료되었습니다.',
      }, HttpStatus.OK);
    }
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
