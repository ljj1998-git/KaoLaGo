import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import {
  CreateDictionaryDto,
  SearchDictionaryDto,
  UpdateDictionaryDto,
} from '@/dtos';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('dictionary')
@ApiTags('字典管理')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @Post('create')
  @ApiOperation({ summary: '新增字典' })
  create(@Body() createDictionaryDto: CreateDictionaryDto) {
    return this.dictionaryService.create(createDictionaryDto);
  }

  @Post('search')
  @ApiOperation({ summary: '查询字典树' })
  search(@Body() searchDictionaryDto: SearchDictionaryDto) {
    return this.dictionaryService.search(searchDictionaryDto);
  }

  @Get('searchParent')
  @ApiOperation({ summary: '查询最上级字典' })
  searchParent() {
    return this.dictionaryService.searchParent();
  }

  @Put('update')
  @ApiOperation({ summary: '编辑字典' })
  update(@Body() updateDictionaryDto: UpdateDictionaryDto) {
    return this.dictionaryService.update(updateDictionaryDto);
  }

  @Delete('delete')
  remove(@Query('id') id: number) {
    return this.dictionaryService.delete(id);
  }
}
