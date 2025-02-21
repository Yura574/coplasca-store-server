import { BadRequestException, INestApplication, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser'
import { validationError } from '../infrastructure/utils/validationError';
import { useContainer } from 'class-validator';
import { AppModule } from '../app.module';
import {HttpExceptionsFilter} from "../infrastructure/exceptions-filters/exceptions";

export const applyAppSetting = (app: INestApplication) => {
  // app.useGlobalInterceptors(new Logging)
  // app.use(Logge)
  // setSwagger(app)
  // app.useGlobalGuards(new AuthGuard())
app.use(cookieParser());
  app.enableCors()
  useContainer(app.select(AppModule), {fallbackOnErrors: true})
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    stopAtFirstError: true,
    whitelist: true,
    exceptionFactory: (errors) => {
      const errorsMessages = validationError(errors);
      throw new BadRequestException(errorsMessages);
    }
  }));
  app.useGlobalFilters(new HttpExceptionsFilter());
};


