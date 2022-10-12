import { IsDateString, IsNotEmpty, IsNumber } from "class-validator";

export default class UserRequestModel{

  id: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  code: number;
  msg: string;
}
