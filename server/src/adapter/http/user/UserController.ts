import { Body, Controller, Get, Inject, Param, Post, Req, UseGuards, Request, Query } from "@nestjs/common";
import { UIB, UserInteractorBoundary } from "../../../usecase/boundaries/UserInteractorBoundary";
import { UserRequestModel } from "../../../usecase/domain/UserRequestModel";
import { UserResponseModel } from "../../../usecase/domain/UserResponseModel";
import { Public } from "../../security/PublicEndPoint";
import { RefreshTokenGuard } from "../../security/guards/RefreshTokenGuard";

@Controller("users")
export class UserController {

  constructor(
    @Inject(UIB)
    private readonly userInteractorBoundary: UserInteractorBoundary
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
    return await this.userInteractorBoundary.login(userRequestModel);
  }

  @Get(":email")
  async find(
    @Param("email") email: string
  ): Promise<UserResponseModel> {
    return await this.userInteractorBoundary.findByEmail(email);
  }

  @Post("logout")
  async logout(@Body() userRequestModel: UserRequestModel) {
    return userRequestModel;
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post("refresh")
  async refresh(@Request() req): Promise<UserResponseModel> {
    return await this.userInteractorBoundary.refresh(req.user.sub,req.user.email);
  }

  @Public()
  @Get("password/reset-link")
  async getResetPasswordLink(
    @Query() userRequestModel: UserRequestModel
  ): Promise<UserResponseModel> {
    return await
      this.userInteractorBoundary.generateResetPasswordLink(userRequestModel);
  }

  @Public()
  @Post("password/reset")
  async resetPasswordLink(
    @Body() userRequestModel: UserRequestModel
  ): Promise<UserResponseModel> {
    return await this.userInteractorBoundary.changeResetPasswordLink(userRequestModel);
  }
}
