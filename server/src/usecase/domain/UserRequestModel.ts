import { IsEmail, IsNotEmpty, ValidateIf } from "class-validator";

export class UserRequestModel{

  id: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @ValidateIf((object, value) => value)
  password: string;

  code: number;
  msg: string;
}
