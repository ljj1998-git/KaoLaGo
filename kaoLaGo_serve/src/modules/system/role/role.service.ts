import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateMenuReq } from '../menu/dto/menu.req';
import { CustomRequest } from '@/types/customRequest';
import { RESPONSE_CODE } from '@/constants/index';
import { AjaxResultService } from '@/common/modules/ajax-responese/ajaxResponse.service';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { ILike, Repository } from 'typeorm';
import { CreateRoleReq, QueryRoleReq } from './dto/role.req';

@Injectable()
export class RoleService {
  constructor(
    @Inject('RESPONSE_CODE')
    private readonly responseCode: typeof RESPONSE_CODE,
    private readonly r: AjaxResultService,
    @InjectRepository(RoleEntity)
    private roleEntity: Repository<RoleEntity>,
  ) {}

  /** 新增角色 */
  async createRole(createRoleReq: CreateRoleReq, req: CustomRequest) {
    const { code } = createRoleReq;
    const { username } = req.user;

    try {
      const res = this.roleEntity.findOneBy({ code });
      if (res) {
        return this.r.error('角色编码已存在');
      }

      this.roleEntity
        .createQueryBuilder()
        .insert()
        .into(RoleEntity)
        .values({
          ...createRoleReq,
          createdBy: username,
        })
        .execute();
      return this.r.success();
    } catch (e) {
      throw new HttpException(
        e.message,
        this.responseCode.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getRoleList(params: QueryRoleReq) {
    const { pageNum, pageSize, name = '' } = params;
    try {
      const [result, total] = await this.roleEntity.findAndCount({
        skip: (pageNum - 1) * pageSize,
        take: pageSize,
        where: {
          name: ILike('%' + name + '%'),
        },
      });
      return this.r.success({
        total,
        list: result,
      });
    } catch (e) {
      throw new HttpException(
        e.message,
        this.responseCode.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /** 删除角色 */
  async deleteRole(id: number) {}

  /** 编辑角色 */
  async updateRole(id: number, createRoleReq: CreateRoleReq) {}
}
