import {IsString} from "class-validator";
import {Transform} from "class-transformer";
import {BadRequestException} from "@nestjs/common";
import {ErrorMessageType} from "../../../../../infrastructure/exception-filters/exeptions";


export class NewCategoryInputModel {
    @IsString()
    @Transform(({value}) => {
        if (typeof value !== "string") {
            throw new BadRequestException([{
                message: 'Price should be a string',
                field: 'userId'
            }] as ErrorMessageType[]);
        }
        return value.trim()
    })
    category: string
}