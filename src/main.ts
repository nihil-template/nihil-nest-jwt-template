import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { AppModule } from '@/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // 쿠키 파서가 필요하다.
  app.use(cookieParser());
  app.use(helmet());
  await app.listen(4000);
  console.log('서버가 4000 포트에서 실행됩니다.');
}
bootstrap();
