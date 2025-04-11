import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeepseekService } from './deepseek.service';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const OpenAI = require('openai');

@Controller('user')
@ApiTags('用户管理')
// @UseGuards(RolesGuard)
export class DeepseekController {
  constructor(private readonly deepseekService: DeepseekService) {}
  @ApiOperation({ summary: '获取验证码' })
  @Get('getCaptcha')
  getCaptcha() {
    const openai = new OpenAI({
      baseURL: 'https://api.deepseek.com',
      apiKey: 'sk-a640578781924374a03becc504fcc636',
    });
    try {
      const completion = openai.beta.chat.completions.stream({
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: '你好' },
        ],
        model: 'deepseek-reasoner',
        stream: true,
        max_tokens: 500,
        frequency_penalt: 1,
        presence_penalty: 1,
      });
      completion.on('content', (delta) => {
        console.log(delta);
      });
    } catch (error) {}
  }
}
