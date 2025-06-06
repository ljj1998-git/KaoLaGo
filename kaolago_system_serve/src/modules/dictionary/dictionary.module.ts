import { Module } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { DictionaryController } from './dictionary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DictionaryEntity } from '@/entities';

@Module({
  imports: [TypeOrmModule.forFeature([DictionaryEntity])],
  controllers: [DictionaryController],
  providers: [DictionaryService],
})
export class DictionaryModule {}
