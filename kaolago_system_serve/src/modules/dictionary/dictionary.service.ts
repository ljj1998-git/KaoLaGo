import { HttpException, Inject, Injectable } from '@nestjs/common';
import {
  CreateDictionaryDto,
  SearchDictionaryDto,
  UpdateDictionaryDto,
} from '@/dtos';
import { IsNull, TreeRepository } from 'typeorm';
import { DictionaryEntity } from '@/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { RESPONSE_CODE } from '@/constants';

@Injectable()
export class DictionaryService {
  constructor(
    @Inject('RESPONSE_CODE')
    private readonly responseCode: typeof RESPONSE_CODE,
    @InjectRepository(DictionaryEntity)
    private readonly dictionaryEntity: TreeRepository<DictionaryEntity>,
  ) {}

  /**
   * @description 新增字典
   */
  async create(createDictionaryDto: CreateDictionaryDto) {
    const { key, parentId } = createDictionaryDto;
    try {
      const res = await this.dictionaryEntity.findOneBy({ key });
      if (res) {
        return '字典值已存在';
      }
      console.log(parentId);

      if (parentId) {
        const parent = await this.dictionaryEntity.findOne({
          where: { id: parentId },
        });
        const d = this.dictionaryEntity.create({
          ...createDictionaryDto,
          parent,
        });
        await this.dictionaryEntity.save(d);
      } else {
        await this.dictionaryEntity.save(createDictionaryDto);
      }

      return '添加成功';
    } catch (e) {
      throw new HttpException(
        e.message,
        this.responseCode.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * @description 查询字典树
   */
  async search(searchDictionaryDto: SearchDictionaryDto) {
    try {
      const keyword = searchDictionaryDto.name?.trim();
      const res = await this.dictionaryEntity.findTrees({});
      if (!keyword) {
        return { message: '查询成功', data: res };
      }
      const filterTree = (nodes: DictionaryEntity[]): DictionaryEntity[] => {
        return nodes
          .map((node) => {
            // 深拷贝当前节点（避免污染原始数据）
            const newNode = { ...node, children: [] };

            // 判断当前节点是否匹配
            const isSelfMatched = node.name.includes(keyword);

            if (isSelfMatched) {
              // 如果当前节点匹配，保留所有子节点（不递归过滤）
              newNode.children = node.children.map((child) => ({ ...child }));
              return newNode;
            } else {
              // 如果不匹配，递归过滤子节点
              const filteredChildren = filterTree(node.children);
              if (filteredChildren.length > 0) {
                // 如果子节点有匹配，保留当前节点并挂载过滤后的子节点
                newNode.children = filteredChildren;
                return newNode;
              }
              // 不满足条件则丢弃
              return null;
            }
          })
          .filter((node) => node !== null);
      };

      return { messsage: '查询成功', data: filterTree(res) };
    } catch (e) {
      throw new HttpException(
        e.message,
        this.responseCode.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * @description 查询最上级字典
   */
  async searchParent() {
    try {
      const res = await this.dictionaryEntity.find({
        where: {
          parentId: IsNull(),
        },
      });
      return { messsage: '查询成功', data: res };
    } catch (e) {
      throw new HttpException(
        e.message,
        this.responseCode.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * @description 编辑字典
   */
  async update(updateDictionaryDto: UpdateDictionaryDto) {
    try {
      const { id, ...others } = updateDictionaryDto;
      await this.dictionaryEntity.update(id, others);
      return '编辑成功';
    } catch (e) {
      throw new HttpException(
        e.message,
        this.responseCode.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: number) {
    try {
      await this.dictionaryEntity.delete(id);
      return '删除成功';
    } catch (e) {
      throw new HttpException(
        e.message,
        this.responseCode.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
