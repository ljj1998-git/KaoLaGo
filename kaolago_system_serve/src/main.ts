import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './pipes/validation.pipe';
import { HttpExceptionFilter } from './filters/httpException.filter';
import { HttpResponse } from './utils/response.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // swagger
  const swaggerOptions = new DocumentBuilder()
    .setTitle('nest api文档')
    .setDescription('这是一个描述')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('doc', app, document);
  // 全局管道
  app.useGlobalPipes(new ValidationPipe());
  // 全局过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 全局response处理
  app.useGlobalInterceptors(new HttpResponse());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
