import { IsNotEmpty } from 'class-validator';

export class SighInUserDto {
  @IsNotEmpty()
  public username: string;

  @IsNotEmpty()
  public password: string;
}
