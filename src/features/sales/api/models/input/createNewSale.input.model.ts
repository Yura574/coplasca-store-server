import {IsArray, IsOptional, IsString, ValidateNested} from "class-validator";
import {Transform, Type} from "class-transformer";
import {BadRequestException} from "@nestjs/common";
import {ErrorMessageType} from "../../../../../infrastructure/exception-filters/exeptions";
import {SaleDataInfoType} from "../types/saleDataInfoType";


export class CreateNewSaleInputModel {

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SaleDataInfoType)
    saleDataInfo: SaleDataInfoType[]

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