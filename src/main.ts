import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { applyAppSetting } from './settings/apply-app-setting';
import { appSettings } from './settings/appSettings';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['https://coplasca.vercel.app', 'http://localhost:3000'],
    credentials: true,
  });

  applyAppSetting(app);
  await app.listen(appSettings.api.APP_PORT, () => {
    console.log('App starting listen port: ', appSettings.api.APP_PORT);
    console.log('ENV: ', appSettings.env.getEnv());
  });
}

bootstrap();
