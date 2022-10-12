import { Body, Controller, Get, Inject, Param, Post, Req, Res } from "@nestjs/common";
import { UIB, UserInteractorBoundary } from "../../../usecase/boundaries/UserInteractorBoundary";
import { Request, Response } from "express";
import UserRequestModel from "../../../usecase/domain/UserRequestModel";
import UserResponseModel from "../../../usecase/domain/UserResponseModel";
import { JwtService } from "@nestjs/jwt";
import { IOCode } from "../../../common/IOCode";
import { IOMsg } from "../../../common/IOMsg";

@Controller("user")
export class UserController {

  constructor(
    @Inject(UIB)
    private readonly userInteractorBoundary: UserInteractorBoundary,
    private jwtService: JwtService
  ) {
  }

  @Post("register")
  async register(
    @Body() userRequestModel: UserRequestModel,
    @Req() request: Request
  ): Promise<UserResponseModel> {
    return await this.userInteractorBoundary.register(userRequestModel);
  }

  @Post("login")
  async login(
    @Body() userRequestModel: UserRequestModel,
    @Res({ passthrough: true }) response: Response
  ): Promise<UserResponseModel> {

    const userResponseModel = await this.userInteractorBoundary
    .login(userRequestModel);

    if (userResponseModel.code === IOCode.OK) {
      const jwt = await this.jwtService.signAsync({
        username: userResponseModel.username
      });
      response.cookie("jwt", jwt, {
        httpOnly: true,
        sameSite: "none",
        secure: true
      });
      response.cookie("isLoggedIn", true, {
        sameSite: "none",
        secure: true
      });
    }

    return userResponseModel;
  }

  @Get(":username")
  async find(
    @Param("username") username: string,
    @Req() request: Request
  ): Promise<UserResponseModel> {
    return await this.userInteractorBoundary.findByUsername(username);
  }

  @Post("logout")
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie("jwt");
    response.cookie("isLoggedIn", false);
    return {
      msg: IOMsg.LOGOUT,
      code: IOCode.OK
    };
  }
}
