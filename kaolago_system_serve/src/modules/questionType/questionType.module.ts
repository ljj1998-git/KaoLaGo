import { Module } from '@nestjs/common';
import { QuestionTypeController } from './questionType.controller';
import { QuestionTypeService } from './questionType.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionTypeEntity } from '@/entities';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionTypeEntity])],
  controllers: [QuestionTypeController],
  providers: [QuestionTypeService],
  exports: [],
})
export class QuestionTypeModule {}
