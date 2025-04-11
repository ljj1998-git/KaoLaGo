import { Controller, Get } from '@nestjs/common';
import { AuthService } from '@/modules/system/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('/getPermission')
  getPermission(): any {
    return this.authService.getPermission();
  }
}
