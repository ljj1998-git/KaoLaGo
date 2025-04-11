import { RESPONSE_CODE } from '@/constants/index';
import { AddQuestionTypeDto } from '@/dtos';
import { QuestionTypeEntity } from '@/entities/index';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionTypeService {
  constructor(
    @Inject('RESPONSE_CODE')
    private readonly responseCode: typeof RESPONSE_CODE,
    @InjectRepository(QuestionTypeEntity)
    private questionTypeEntity: Repository<QuestionTypeEntity>,
  ) {}

  async addQuestionType(addQuestionTypeDto: AddQuestionTypeDto) {
    try {
      await this.questionTypeEntity.save(addQuestionTypeDto);
      return '新增成功';
    } catch (e) {
      throw new HttpException(
        e.message,
        this.responseCode.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
