import {IsString} from "class-validator";
import {Transform} from "class-transformer";
import {BadRequestException} from "@nestjs/common";
import {ErrorMessageType} from "../../../../../infrastructure/exception-filters/exeptions";


export class NewCategoryInputModel {
    @IsString()
    @Transform(({value}) => {
        if (typeof value !== "string") {
            console.log(value)
            throw new BadRequestException([{
                message: 'Title should be a string',
                field: 'title'
            }] as ErrorMessageType[]);
        }
        return value.trim()
    })
    title: string
}