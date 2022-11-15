import {AuthDto} from "../../AuthDto";
import {AuthDtoBuilder} from "../AuthDtoBuilder";
import {Injectable} from "@nestjs/common";

@Injectable()
export class AuthDtoBuilderImpl implements AuthDtoBuilder{

  authDto = new AuthDto();

  withAuthToken(authToken: string | null): this {
    this.authDto.authToken = authToken;
    return this;
  }

  withRefreshToken(refreshToken: string | null): this {
    this.authDto.refreshToken = refreshToken;
    return this;
  }

  build(): AuthDto {
    return this.authDto;
  }

}