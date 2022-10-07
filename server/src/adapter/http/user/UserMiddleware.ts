import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { JwtService } from "@nestjs/jwt";
import { IOMsg } from "../../../common/IOMsg";
import { IOCode } from "../../../common/IOCode";

@Injectable()
export class UserMiddleware implements NestMiddleware {

  constructor(private jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {

    const cookie = req.cookies["jwt"];
    const jwtErrorRes = {
      msg : IOMsg.JWT_ERROR,
      code : IOCode.ERROR
    };

    if (!cookie){
      this.prepareMiddlewareResponse(res,jwtErrorRes);
      return
    }

    const user = await this.jwtService.verifyAsync(cookie);

    if (!user){
      this.prepareMiddlewareResponse(res,jwtErrorRes);
      return
    }

    next();
  }

  prepareMiddlewareResponse(res: Response, resObj) : Response {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.write(JSON.stringify(resObj));
    res.end();
    return res
  }

}
