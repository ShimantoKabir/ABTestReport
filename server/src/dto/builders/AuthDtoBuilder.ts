import {AuthDto} from "../AuthDto";

export const ADB = "ADB";
export interface AuthDtoBuilder{
  withAuthToken(authToken: string|null): this;
  withRefreshToken(refreshToken: string|null): this;
  build() : AuthDto;
}