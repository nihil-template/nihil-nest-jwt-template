import { EntityRepository, Repository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { User } from '@/entities/user.entity';
import { CreateUserDto } from '@/user/dto/create.user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const { username, password, email, } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    if (username.includes(' ')) {
      throw new HttpException({
        message: '아이디에는 공백을 넣을 수 없습니다.',
      }, HttpStatus.BAD_REQUEST);
    }

    const userNameCheck = await this.find({ username, });
    const emailCheck = await this.find({ email, });

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
      const user = this.create({
        username,
        password: hashedPassword,
        email,
      });

      await this.save(user);

      throw new HttpException({
        message: '회원가입이 완료되었습니다.',
      }, HttpStatus.OK);
    }
  }
}
