import {CanActivate,ExecutionContext,Injectable,SetMetadata,} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { UserRole } from 'src/entities/enums/role.enum';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<UserRole[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return requiredRoles.includes(user.role);
  }
}

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
