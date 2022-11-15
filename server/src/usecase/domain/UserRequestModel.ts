import {IsEmail, IsNotEmpty} from "class-validator";

export class UserRequestModel{

  id: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  code: number;
  msg: string;
}
