import {ConfigModule} from "@nestjs/config";
import * as process from "node:process";



export const configModule = ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: [
        `.env.${process.env.NODE_ENV}.local`,
        `.env.${process.env.NODE_ENV}`,
        `.env.production`
    ]
})