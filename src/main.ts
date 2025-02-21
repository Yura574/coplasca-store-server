import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as process from "node:process";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {applyAppSetting} from "./settings/apply-app-setting";


async function bootstrap() {
    const app = await NestFactory.create(AppModule);


applyAppSetting(app)
    const config = new DocumentBuilder()
        .setTitle('title for swagger')
        .setDescription('description for swagger')
        .setVersion('1.0')
        .build()
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);

    await app.listen(process.env.PORT || 3000, () => {
        console.log(process.env.NODE_ENV);
        console.log(process.env.PORT);
        console.log(process.env.MONGO_URI);
    });
}

bootstrap();
