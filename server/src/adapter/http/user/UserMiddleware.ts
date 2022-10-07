import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { JwtService } from "@nestjs/jwt";
import { IOMsg } from "../../../common/IOMsg";
import { IOCode } from "../../../common/IOCode";

@Injectable()
export class UserMiddleware implements NestMiddleware {

  constructor(private jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const cookie = req.cookies["jwt"];
      if (cookie){
        const user = await this.jwtService.verifyAsync(cookie);
        console.log("user",user);
        if (!user){
          this.prepareMiddlewareResponse(res,{
            msg : IOMsg.JWT_ERROR,
            code : IOCode.ERROR
          });
          return
        }
      }else {
        this.prepareMiddlewareResponse(res,{
          msg : IOMsg.JWT_ERROR,
          code : IOCode.ERROR
        });
        return
      }
    }catch (e) {
      console.log("error: ",e);
      this.prepareMiddlewareResponse(res,{
        msg : e.message,
        code : IOCode.ERROR
      });
      return
    }
    next();
  }

  prepareMiddlewareResponse(res: Response, resObj) : Response {
    res.writeHead(200, { 'content-type': 'application/json' })
    res.write(JSON.stringify(resObj))
    res.end()
    return res
  }

}
