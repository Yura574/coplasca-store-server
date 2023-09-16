import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { NextFunction, Request, Response} from 'express';

async function bootstrap() {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, );
    // app.use(cookieParser())

    app.enableCors({
      "origin": "http://localhost:3000/",
      "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    });
    await app.listen(5000);

  } catch (e) {
    console.log(e);
  }
}
bootstrap();
