import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { QuestionTypeService } from './questionType.service';
import { AddQuestionTypeDto } from '@/dtos';

@Controller('questionType')
@ApiTags('题目类型管理')
// @UseGuards(RolesGuard)
export class QuestionTypeController {
  constructor(private readonly questionTypeService: QuestionTypeService) {}

  @ApiOperation({ summary: '新增题目类型' })
  @Post('addQuestionType')
  addQuestionType(@Body() addQuestionTypeDto: AddQuestionTypeDto) {
    this.questionTypeService.addQuestionType(addQuestionTypeDto);
  }
}
