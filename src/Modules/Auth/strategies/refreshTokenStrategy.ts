import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';


export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor() {
    super({
        jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
        ignoreExpiration: false,
        secretOrKey: process.env.JWT_SECRET
      }
    );
  }

  async validate(payload: any){
    return {username: payload.username}
  }
}