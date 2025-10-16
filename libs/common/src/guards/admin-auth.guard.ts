import {CanActivate,ExecutionContext,Injectable,UnauthorizedException,} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { IJWTConfig } from '@app/common/models';
import { AdminJwtPayload } from './models';


@Injectable()
export class AdminAuthGuard implements CanActivate {
  private jwtConfig: IJWTConfig;
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtConfig = this.configService.get("JWT_CONFIG") as IJWTConfig
  }
async canActivate(context: ExecutionContext): Promise<boolean> {
  const request = context.switchToHttp().getRequest();
  console.log('AdminAuthGuard: headers', request.headers);

  const authHeader = request.headers['authorization'];
  if (!authHeader) {
    console.log('No auth header');
    throw new UnauthorizedException('No authorization header');
  }

  const [bearer, token] = authHeader.trim().split(' ');
  console.log('Bearer:', bearer, 'Token:', token);

  if (bearer.toLowerCase() !== 'bearer' || !token) {
    console.log('Invalid format');
    throw new UnauthorizedException();
  }

  try {
    const payload = this.jwtService.verify(token, {
      secret: this.configService.get<string>('JWT_ADMIN_SECRET'),
    });
    console.log('JWT payload:', payload);

    request.user = {
      id: payload.sub,
      name: payload.name,
      temp: payload.temp ?? false,
    };
  } catch (err) {
    console.log('JWT verification error', err);
    throw new UnauthorizedException('Invalid or expired token');
  }

  return true;
}

}