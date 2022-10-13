import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { IOMsg } from "../../../common/IOMsg";
import { IOCode } from "../../../common/IOCode";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class ExperimentMiddleware implements NestMiddleware {

  constructor(private jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {

    const jwt = req.header("Authorization");

    if (!jwt){
      this.prepareMiddlewareResponse(res);
      return
    }

    const user = await this.jwtService.verifyAsync(jwt);

    if (!user){
      this.prepareMiddlewareResponse(res);
      return
    }

    next();
  }

  prepareMiddlewareResponse(res: Response) : Response {
    const jwtErrorRes = {
      msg : IOMsg.JWT_ERROR,
      code : IOCode.ERROR
    };
    res.writeHead(200, { 'content-type': 'application/json' });
    res.write(JSON.stringify(jwtErrorRes));
    res.end();
    return res
  }

}
