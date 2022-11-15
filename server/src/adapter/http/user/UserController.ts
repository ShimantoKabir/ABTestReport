import { Body, Controller, Get, Inject, Param, Post, Req, Res } from "@nestjs/common";
import { UIB, UserInteractorBoundary } from "../../../usecase/boundaries/UserInteractorBoundary";
import { Request, Response } from "express";
import { UserRequestModel } from "../../../usecase/domain/UserRequestModel";
import { UserResponseModel } from "../../../usecase/domain/UserResponseModel";
import { JwtService } from "@nestjs/jwt";
import { IOCode } from "../../../common/IOCode";
import { IOMsg } from "../../../common/IOMsg";
import { Public } from "../../security/PublicEndPoint";

@Controller("user")
export class UserController {

  constructor(
    @Inject(UIB)
    private readonly userInteractorBoundary: UserInteractorBoundary,
    private jwtService: JwtService
  ) {
  }

  @Public()
  @Post("register")
  async register(
    @Body() userRequestModel: UserRequestModel
  ): Promise<UserResponseModel> {
    return await this.userInteractorBoundary.register(userRequestModel);
  }

  @Public()
  @Post("login")
  async login(
    @Body() userRequestModel: UserRequestModel
  ): Promise<UserResponseModel> {

    const userResponseModel = await this.userInteractorBoundary
    .login(userRequestModel);

    if (userResponseModel.code === IOCode.OK) {
      const jwt = await this.jwtService.signAsync({
        email: userResponseModel.email
      });
      userResponseModel.setJwtToken(jwt);
    }

    return userResponseModel;
  }

  @Get(":email")
  async find(
    @Param("email") email: string,
    @Req() request: Request
  ): Promise<UserResponseModel> {
    return await this.userInteractorBoundary.findByEmail(email);
  }

  @Post("logout")
  async logout(@Res({ passthrough: true }) response: Response) {
    return {
      msg: IOMsg.LOGOUT,
      code: IOCode.OK
    };
  }
}
