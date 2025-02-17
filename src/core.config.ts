import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {IsBoolean, IsNumber, IsString} from "class-validator";
import {configValidationUtility} from "./configValidationUtility";


export enum Environments {
    DEVELOPMENT = "development",
    STAGING = "staging",
    PRODUCTION = "production",
    TESTING = "testing",
}

@Injectable()
export class CoreConfig {
    constructor(private configService: ConfigService) {
        configValidationUtility.validateConfig(this)
    }

    @IsNumber()
    port: number = +(this.configService.get('PORT') || '5000')

    @IsBoolean()
    IsSwaggerEnabled: boolean = configValidationUtility.convertToBoolean(this.configService.get('IS_SwaggerEnabled') || 'false');

    @IsString()
    mongoUri: string = this.configService.get('MONGO_URI') || 'mongodb://localhost:27017/'

}

