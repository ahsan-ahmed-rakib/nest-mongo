import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private JwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.tokenFromHeader(request);
    if (!token)
      throw new UnauthorizedException(
        'You are not logged in! Please log in to continue!',
      );

    try {
      const payload = this.JwtService.verify(token);
      request.userId = payload.userId;
    } catch (error: any) {
      throw new UnauthorizedException('Invalid Token');
    }

    return true;
  }

  private tokenFromHeader(request: Request): string | undefined {
    return request?.headers?.authorization?.split(' ')[1];
  }
}
