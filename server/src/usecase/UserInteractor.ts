import { UserInteractorBoundary } from "./boundaries/UserInteractorBoundary";
import UserRequestModel from "./domain/UserRequestModel";
import UserResponseModel from "./domain/UserResponseModel";
import { IOMsg } from "../common/IOMsg";
import { IOCode } from "../common/IOCode";
import { Inject } from "@nestjs/common";
import { UP, UserPresenter } from "./presenters/UserPresenter";
import { InjectRepository } from "@nestjs/typeorm";
import UserEntity from "../adapter/data/entities/UserEntity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import AppConstants from "../common/AppConstants";

export default class UserInteractor implements UserInteractorBoundary{

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(UP)
    private readonly userPresenter: UserPresenter
  ) {}

  async login(userRequestModel: UserRequestModel): Promise<UserResponseModel> {

    userRequestModel.msg = IOMsg.LOGIN_SUCCESS;
    userRequestModel.code = IOCode.OK

    const user = await this.userRepository.findOne({
      where : {
        username : userRequestModel.username,
      }
    });

    if (!user){
      userRequestModel.msg = IOMsg.LOGIN_UNSUCCESSFUL;
      userRequestModel.code = IOCode.ERROR
      return this.userPresenter.loginResponse(userRequestModel);
    }

    const isMatch = await bcrypt.compare(userRequestModel.password, user.password);

    if (!isMatch){
      userRequestModel.msg = IOMsg.LOGIN_UNSUCCESSFUL;
      userRequestModel.code = IOCode.ERROR
      return this.userPresenter.loginResponse(userRequestModel);
    }

    return this.userPresenter.loginResponse(userRequestModel);
  }

  async register(userRequestModel: UserRequestModel): Promise<UserResponseModel> {

    userRequestModel.msg = IOMsg.REGISTRATION_SUCCESS;
    userRequestModel.code = IOCode.OK

    try {

      const user = await this.userRepository.findOne({
        where : {
          username : userRequestModel.username
        }
      });

      if (user){
        userRequestModel.msg = IOMsg.USER_EXIST;
        userRequestModel.code = IOCode.ERROR
        return this.userPresenter.registrationResponse(userRequestModel);
      }

      const password = await bcrypt.hash(
        userRequestModel.password,
        AppConstants.SALT_OR_ROUNDS
      )

      const userEntity : { password: string; username: string } = {
        password: password,
        username: userRequestModel.username
      };

      const res = await this.userRepository.save(userEntity);

      if (!res.id){
        userRequestModel.msg = IOMsg.REGISTRATION_UNSUCCESSFUL;
        userRequestModel.code = IOCode.ERROR
        return this.userPresenter.registrationResponse(userRequestModel);
      }

      return this.userPresenter.registrationResponse(userRequestModel);

    }catch (e){
      console.log("error: ",e);
      userRequestModel.msg = IOMsg.REGISTRATION_UNSUCCESSFUL;
      userRequestModel.code = IOCode.ERROR
      return this.userPresenter.registrationResponse(userRequestModel);
    }
  }

  async find(username: string): Promise<UserResponseModel> {

    const user = await this.userRepository.findOne({
      where : {
        username : username
      }
    });
    return this.userPresenter.findResponse(user ? user.username : null);
  }
}
