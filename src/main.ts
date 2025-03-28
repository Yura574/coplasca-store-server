import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { applyAppSetting } from './settings/apply-app-setting';
import { appSettings } from './settings/appSettings';
import * as process from "node:process";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe());
  console.log(process.env)
  app.enableCors({
    origin: "https://coplasca.vercel.app",
    credentials: true
  });

  applyAppSetting(app);
  await app.listen(appSettings.api.APP_PORT, () => {
    console.log('App starting listen port: ', appSettings.api.APP_PORT);
    console.log('ENV: ', appSettings.env.getEnv());
  });
}

bootstrap();
