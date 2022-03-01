import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(6, {
    message: '아이디는 최소 6자 이상이어야 합니다.',
  })
  public username: string;

  @IsNotEmpty()
  @IsEmail({}, {
    message: '이메일 형식이 아닙니다.',
  })
  public email: string;

  @IsNotEmpty()
  @MinLength(6, {
    message: '비밀번호는 최소 6자 이상이어야 합니다.',
  })
  public password: string;
}
