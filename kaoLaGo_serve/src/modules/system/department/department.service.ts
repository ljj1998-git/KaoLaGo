import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateDepartmentReq,
  QueryDepartmentInfoReq,
  QueryDepartmentReq,
  QueryDepartmentTreeReq,
  UpdateDepartmentReq,
} from './dto/department.req';
import { DepartmentEntity } from './entities/department.entity';
import { Repository } from 'typeorm';
import { ConstantsProvider } from '@/constants';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomRequest } from '@/types/customRequest';
import { AjaxResultService } from '@/common/modules/ajax-responese/ajaxResponse.service';
import { getDepartmentTreeMysql } from './dao/department.dao';
import { buildTreeByPath } from '@/util/buildTree';
import { plainToClass } from 'class-transformer';
import { BaseResp } from '@/common/dto/base.resp';
import { DepartmentTreeResp } from './dto/department.resp';

@Injectable()
export class DepartmentService {
  constructor(
    private readonly constants: ConstantsProvider,
    private readonly r: AjaxResultService,
    @InjectRepository(DepartmentEntity)
    private departmentEntity: Repository<DepartmentEntity>,
  ) {}

  /** 新增部门 */
  async createDepartment(
    CreateDepartmentReq: CreateDepartmentReq,
    req: CustomRequest,
  ) {
    const { username } = req.user;
    const department = this.departmentEntity.create({
      ...CreateDepartmentReq,
      createdBy: username,
    });
    try {
      await this.departmentEntity.save(department);
      return this.r.success();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /** 删除部门 */
  async deleteDepartment(
    QueryDepartmentReq: QueryDepartmentInfoReq,
    req: CustomRequest,
  ) {
    const { username } = req.user;
    const { id } = QueryDepartmentReq;
    try {
      await this.departmentEntity.update(id, {
        isDeleted: 1,
        updatedBy: username,
        updatedAt: new Date(),
      });
      return this.r.success();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /** 更新部门 */
  async updateDepartment(
    updateDepartmentReq: UpdateDepartmentReq,
    req: CustomRequest,
  ) {
    const { username } = req.user;
    const { id, ...otherParams } = updateDepartmentReq;
    try {
      this.departmentEntity
        .createQueryBuilder()
        .update(DepartmentEntity)
        .set({ ...otherParams, updatedBy: username, updatedAt: new Date() })
        .where('id = :id', { id })
        .execute();

      return this.r.success();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /** 获取部门列表 */
  async getDepartmentList(QueryDepartmentReq: QueryDepartmentReq) {
    const { pageNum, pageSize, name, code } = QueryDepartmentReq;
    try {
      const [result, total] = await this.departmentEntity.findAndCount({
        skip: (pageNum - 1) * pageSize,
        take: pageSize,
        where: { name, code },
      });
      return this.r.success({
        total,
        list: result,
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /** 获取部门树 */
  async getDepartmentTree(QueryDepartmentReq: QueryDepartmentTreeReq) {
    try {
      const { name = '', code = '', status = '' } = QueryDepartmentReq;
      let res = await this.departmentEntity.query(getDepartmentTreeMysql(), [
        `%${name}%`,
        `%${code}%`,
        `%${status}%`,
      ]);
      // 原生query需要转换
      res = plainToClass(DepartmentTreeResp, res);
      if (name || code || status) {
        return this.r.success(res);
      }
      const tree = buildTreeByPath(res);
      return this.r.success(tree);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /** 获取部门详情 */
  async getDepartmentInfo(params: QueryDepartmentInfoReq) {
    const { id } = params;
    try {
      const result = await this.departmentEntity.findOneBy({ id });
      if (!result) {
        return this.r.error('部门不存在');
      }
      return this.r.success(result);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
