import {IsOptional, IsString} from "class-validator";
import {Transform} from "class-transformer";
import {BadRequestException} from "@nestjs/common";
import {ErrorMessageType} from "../../../../../infrastructure/exception-filters/exeptions";


export class CreateNewSaleInputModel {
    @IsOptional()
    @IsString()
    @Transform(({value}) => {
        if (typeof value !== "string") {
            throw new BadRequestException([{message: 'Scent should be string', field: 'userId'}] as ErrorMessageType[]);
        }
        return value.trim()
    })
    scent?: string

    @IsOptional()
    @IsString()
    @Transform(({value}) => {
        if (typeof value !== "string") {
            throw new BadRequestException([{
                message: 'Category should be string',
                field: 'userId'
            }] as ErrorMessageType[]);
        }
        return value.trim()
    })
    category?: string

    @IsOptional()
    @IsString()
    @Transform(({value}) => {
        if (typeof value !== "string") {
            throw new BadRequestException([{
                message: 'Volume should be a string',
                field: 'userId'
            }] as ErrorMessageType[]);
        }
        return value.trim()
    })
    volume?: string

    @IsOptional()
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
    price?: string

    @IsOptional()
    @IsString()
    @Transform(({value}) => {
        if (typeof value !== "string") {
            throw new BadRequestException([{
                message: 'Payment method should be a string',
                field: 'paymentMethod'
            }] as ErrorMessageType[]);
        }
        return value.trim()
    })
    paymentMethod?: string

    @IsOptional()
    @IsString()
    @Transform(({value}) => {
        if (typeof value !== "string") {
            throw new BadRequestException([{
                message: 'Point of sale should be a string',
                field: 'pointOfSale'
            }] as ErrorMessageType[]);
        }
        return value.trim()
    })
    pointOfSale?: string

    @IsOptional()
    @IsString()
    @Transform(({value}) => {
        if (typeof value !== "string") {
            throw new BadRequestException([{
                message: 'CreatedAt should be a string',
                field: 'createdAd'
            }] as ErrorMessageType[]);
        }
        return value.trim()
    })
    createdAt?: string
}