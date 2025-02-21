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
import {appSettings} from "./settings/appSettings";
import {MongoMemoryServer} from "mongodb-memory-server";

@Module({
    imports: [
        configModule,
        MongooseModule.forRootAsync({
                useFactory: async () => {
                    let uri = appSettings.api.MONGO_URI;
                    // console.log('uri', process.env.NODE_ENV)
                    if (appSettings.env.isTesting()) {
                        let mongo = await MongoMemoryServer.create();
                        console.log(mongo.getUri())
                       uri = mongo.getUri();
                    }
                    return  {uri} ;
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