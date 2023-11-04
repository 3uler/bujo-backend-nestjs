import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { match } from 'fp-ts/lib/TaskOption';
import { identity, pipe } from 'fp-ts/lib/function';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { env } from 'process';
import { UserService } from '../user/service/interface/IUserService';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env['JWT_SECRET'],
    });
  }

  async validate(payload: { userId: string }) {
    const user = this.userService.findById(payload.userId);

    return pipe(user, match(onNoUser, identity))();
  }
}

const onNoUser = () => {
  throw new UnauthorizedException();
};
