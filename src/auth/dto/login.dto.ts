import { IsEmail, IsLowercase, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;
  @IsString()
  @IsLowercase()
  password: string;
}
