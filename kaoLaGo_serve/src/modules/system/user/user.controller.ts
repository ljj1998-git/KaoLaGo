import { DeleteDto, IdDto } from '@/common/dto/base.dto';
import { JwtAuthGuard } from '@/guards/JwtAuth.guard';
import { RolesGuard } from '@/guards/roles/roles.guard';
import {
  BindRoleDto,
  LoginDto,
  QueryUserListReq,
  RegisterDto,
  UpdateUserStatusReq,
} from '@/modules/system/user/dto/user.req';
import { UserService } from '@/modules/system/user/user.service';
import { CustomRequest } from '@/types/customRequest';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Req,
  Session,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('用户管理')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @ApiOperation({ summary: '注册' })
  @UseGuards(JwtAuthGuard)
  register(@Body() registerDto: RegisterDto, @Req() req: CustomRequest) {
    return this.userService.register(registerDto, req);
  }

  @Post('/login')
  @ApiOperation({ summary: '登录' })
  login(@Session() session, @Body() loginDto: LoginDto) {
    return this.userService.login(loginDto, session);
  }

  @ApiOperation({ summary: '退出登录' })
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Req() req): string {
    // console.log(req);
    return 'Hello World!';
  }

  @ApiOperation({ summary: '获取验证码' })
  @Get('getCaptcha')
  getCaptcha(@Session() session) {
    return this.userService.getCaptcha(session);
  }

  @ApiOperation({ summary: '获取用户列表' })
  @Post('list')
  @UseGuards(JwtAuthGuard)
  getUserList(@Body() params: QueryUserListReq) {
    return this.userService.getUserList(params);
  }

  @ApiOperation({ summary: '获取用户信息' })
  @Get('info')
  @UseGuards(JwtAuthGuard)
  getUserInfo(@Query() req: IdDto) {
    const { id } = req;
    return this.userService.getUserInfo(id);
  }

  @ApiOperation({ summary: '更新用户' })
  @Put('update')
  @UseGuards(JwtAuthGuard)
  updateUser(@Body() params: UpdateUserStatusReq, @Req() req: CustomRequest) {
    return this.userService.updateUser(params, req);
  }

  @ApiOperation({ summary: '删除用户' })
  @Post('delete')
  @UseGuards(JwtAuthGuard)
  deleteUser(@Body() params: DeleteDto, @Req() req: CustomRequest) {
    return this.userService.deleteUser(params, req);
  }

  @ApiOperation({ summary: '绑定角色' })
  @Post('bindRole')
  @UseGuards(JwtAuthGuard)
  bindRole(@Body() params: BindRoleDto) {
    return this.userService.bindRole(params);
  }

  @ApiOperation({ summary: '获取用户已绑定角色' })
  @Get('getBindRole')
  @UseGuards(JwtAuthGuard)
  getBindRole(@Query() req: IdDto) {
    const { id } = req;
    return this.userService.getBindRole(id);
  }
}
