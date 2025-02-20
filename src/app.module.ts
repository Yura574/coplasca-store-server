import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {configModule} from "./config-dynamic-module";
import {MongooseModule} from '@nestjs/mongoose';
import {CoreConfig} from "./core.config";
import * as process from "node:process";
import {User, userSchema} from "./features/users/domain/user.entity";
import {UserController} from "./features/users/api/user.controller";
import {UserService} from "./features/users/application/user.service";
import {UserRepository} from "./features/users/infracture/user.repository";

@Module({
    imports: [
        configModule,
        MongooseModule.forRootAsync({
                useFactory: () => {
                    return {uri: 'mongodb+srv://yura574:unbiliever13@cluster0.gkvsq.mongodb.net/development?retryWrites=true&w=majority&appName=Cluster0', autoIndex: true}
                }
            }
        ),
        MongooseModule.forFeature([{name: User.name, schema: userSchema}])
    ],
    controllers: [AppController, UserController],
    providers: [AppService, UserService, UserRepository, CoreConfig],
})
export class AppModule {
}