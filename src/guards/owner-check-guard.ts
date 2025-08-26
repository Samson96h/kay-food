import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UserRole } from 'src/entities/enums/role.enum';

@Injectable()
export class OwnerCheckGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const targetUserId = Number(request.params.id);

    if (!user) {
      throw new ForbiddenException('No user in request');
    }

    if (user.role === UserRole.ADMIN) {
      return true;
    }

    if (user.role === UserRole.USER && user.id === targetUserId) {
      return true;
    }

    throw new ForbiddenException(
      `You cannot update this user. Your id=${user.id}, target id=${targetUserId}, your role=${user.role}`,
    );
  }
}
