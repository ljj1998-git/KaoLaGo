import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('role', context.getHandler());
    console.log(666, roles);
    if (!roles) {
      return true;
    }
    const req = context.switchToHttp().getRequest<Request>();
    console.log(666, roles, req);

    // return matchRoles(roles, user.roles);
  }
}
