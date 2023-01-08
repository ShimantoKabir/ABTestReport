import { IsEmail, IsNotEmpty, IsOptional, IsString, ValidateIf } from "class-validator";

export class UserRequestModel{

  id: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  confirmPassword: string;

  @IsString()
  @IsOptional()
  token: string;

  code: number;
  msg: string;
}
