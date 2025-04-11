import { Global, Module } from '@nestjs/common';
import config from '@/configs';

import { GlobalConstantsModule } from '@/constants';
import { UserModule } from '@/modules/user/user.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { QuestionTypeModule } from './modules/questionType/questionType.module';
import { DictionaryModule } from './modules/dictionary/dictionary.module';

@Global()
@Module({
  imports: [
    GlobalConstantsModule,
    ...config,
    UserModule,
    AuthModule,
    QuestionTypeModule,
    DictionaryModule,
  ],
  controllers: [],
})
export class AppModule {}
