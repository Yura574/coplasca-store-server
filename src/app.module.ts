import { MiddlewareConsumer, Module, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersRepository } from './features/users/infrastructure/users.repository';
import { UsersService } from './features/users/application/users.service';
import { User, UserSchema } from './features/users/domain/user.entity';
import { UsersQueryRepository } from './features/users/infrastructure/usersQuery.repository';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionsFilter } from './infrastructure/exception-filters/exeptions';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailService } from './features/auth/application/email.service';
import { appSettings } from './settings/appSettings';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { AuthController } from './features/auth/api/models/auth.controller';
import { AuthService } from './features/auth/application/auth.service';
import { FallbackController } from './fallback.controller';
import {
  RecoveryPassword,
  RecoveryPasswordSchema,
} from './entity/recoveryPassword.entity';
import { RecoveryPasswordService } from './features/auth/application/recoveryPassword.service';
import { RecoveryPasswordRepository } from './features/auth/infractructure/recoveryPassword.repository';
import { RecoveryPasswordUseCase } from './features/auth/application/useCases/recoveryPassword.use-case';
import { LoginUseCase } from './features/auth/application/useCases/login.use-case';
import { EmailConfirmationUseCase } from './features/auth/application/useCases/emailConfirmation.use-case';
import { RegistrationUseCase } from './features/auth/application/useCases/registration.use-case';
import { NewPasswordUseCase } from './features/auth/application/useCases/newPassword.use-case';
import { ResendingEmailUseCase } from './features/auth/application/useCases/resendingEmail.use-case';
import { Sale, SaleSchema } from './features/sales/domain/sale.entity';
import { SaleRepository } from './features/sales/infractructure/sale.repository';
import { CreateSaleUsecase } from './features/sales/application/usecases/createSale.usecase';
import { GetSaleByIdUsecase } from './features/sales/application/usecases/getSaleById.usecase';
import { SalesController } from './features/sales/api/sales.controller';
import { UserController } from './features/users/api/user.controller';
import { GetSalesUsecase } from './features/sales/application/usecases/getSales.usecase';
import { RefreshTokenUseCase } from './features/auth/application/useCases/refreshToken.use-case';
import { DeleteSaleUsecase } from './features/sales/application/usecases/deleteSale.usecase';
import { CategoryRepository } from './features/reference-data/infractructure/category.repository';
import { CreateCategoryUsecase } from './features/reference-data/application/usecases/category/createCategory.usecase';
import { GetAllCategoriesUsecase } from './features/reference-data/application/usecases/category/getAllCategories.usecase';
import {
  Category,
  CategorySchema,
} from './features/reference-data/domain/category.entity';
import { CategoryController } from './features/reference-data/api/category.controller';
import { ScentController } from './features/reference-data/api/scent.controller';
import { ScentRepository } from './features/reference-data/infractructure/scent.repository';
import { CreateScentUsecase } from './features/reference-data/application/usecases/scent/createScent.usecase';
import { GetAllScentsUsecase } from './features/reference-data/application/usecases/scent/getAllScents.usecase';
import {
  Scent,
  ScentSchema,
} from './features/reference-data/domain/scent.entity';
import { MeUseCase } from './features/auth/application/useCases/me.use-case';

const usersProviders: Provider[] = [
  UsersRepository,
  UsersService,
  UsersQueryRepository,
];

const recoveryPasswordProviders: Provider[] = [
  RecoveryPasswordService,
  RecoveryPasswordRepository,
];

const authUseCases: Provider[] = [
  RegistrationUseCase,
  EmailConfirmationUseCase,
  LoginUseCase,
  RecoveryPasswordUseCase,
  NewPasswordUseCase,
  ResendingEmailUseCase,
  RefreshTokenUseCase,
  MeUseCase,
];

const saleUsecases: Provider[] = [
  SaleRepository,
  CreateSaleUsecase,
  GetSaleByIdUsecase,
  GetSalesUsecase,
  DeleteSaleUsecase,
];
const referenceDataUsecases: Provider[] = [
  CategoryRepository,
  CreateCategoryUsecase,
  GetAllCategoriesUsecase,

  ScentRepository,
  CreateScentUsecase,
  GetAllScentsUsecase,
];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async () => {
        let uri: string = '';
        if (appSettings.env.isDevelopment()) {
          uri = appSettings.api.MONGO_CONNECTION_URI_FOR_DEVELOP;
        }
        if (appSettings.env.isProduction()) {
          uri = appSettings.api.MONGO_CONNECTION_URI;
        }
        if (appSettings.env.isTesting()) {
          let mongo = await MongoMemoryServer.create();
          uri = mongo.getUri();
        }
        return { uri };
      },
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Sale.name, schema: SaleSchema },
      { name: RecoveryPassword.name, schema: RecoveryPasswordSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Scent.name, schema: ScentSchema },
    ]),

    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          service: 'gmail',
          host: 'smtp.gmail.com',
          secure: true,
          port: 465,
          auth: {
            user: 'yura5742248@gmail.com',
            pass: 'evgs shsm qmme vibh',
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [
    UserController,
    AppController,
    AuthController,
    SalesController,
    CategoryController,
    ScentController,

    //обязательно последний
    FallbackController,
  ],
  providers: [
    AppService,
    ...usersProviders,
    ...recoveryPasswordProviders,
    ...authUseCases,
    ...saleUsecases,
    ...referenceDataUsecases,
    AuthService,
    EmailService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionsFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {}
}
