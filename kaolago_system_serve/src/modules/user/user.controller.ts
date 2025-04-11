import { JwtAuthGuard } from '@/guards/JwtAuth.guard';
import { UserService } from './user.service';

import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Session,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from '@/dtos';
import { CustomRequest } from '@/types';

@Controller('user')
@ApiTags('用户管理')
// @UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @ApiOperation({ summary: '注册' })
  // @UseGuards(JwtAuthGuard)
  register(@Body() registerDto: RegisterDto, @Req() req: CustomRequest) {
    return this.userService.register(registerDto, req);
  }

  @Post('/login')
  @ApiOperation({ summary: '登录' })
  login(@Body() loginDto: LoginDto) {
    console.log(loginDto);

    return this.userService.login(loginDto);
  }
}
