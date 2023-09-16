import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UserModule } from './Modules/User/User.module'
import { CategoryModule } from './Modules/Category/Category.module'
import { ImageModule } from './Modules/Image/image.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: +configService.get('PORT'),
        password: configService.get('POSTGRES_PASSWORD'),
        username: configService.get('POSTGRES_USERNAME'),
        entities: [__dirname + '/**/*.entity{.js, .ts}'],
        database: 'coplasca-store',
        synchronize: true,
        logging: true,
      }),
    }),
    UserModule,
    CategoryModule,
    ImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
