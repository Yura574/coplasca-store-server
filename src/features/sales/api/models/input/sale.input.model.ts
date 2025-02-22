import {IsNotEmpty, IsString} from "class-validator";
import {Transform} from "class-transformer";
import {BadRequestException} from "@nestjs/common";
import {ErrorMessageType} from "../../../../../infrastructure/exception-filters/exeptions";


export class SaleInputModel {
    @IsString()
    @Transform(({value}) => {
        if(typeof value !== "string"){
            throw new BadRequestException([{message: 'User id should be string', field: 'userId'}] as ErrorMessageType[]);
        }
        const trimmedValue =  value.trim()
        if(!trimmedValue){
            throw new BadRequestException([{message: 'User id is required', field: 'userId'}] as ErrorMessageType[]);
        }
        return trimmedValue;
    })
    @IsNotEmpty({message: 'User id is required'})
    userId: string


    @IsString()
    @Transform(({value}) => {
        if(typeof value !== "string"){
            throw new BadRequestException([{message: 'Scent should be string', field: 'userId'}] as ErrorMessageType[]);
        }
        return value.trim()
    })
    scent: string

    @IsString()
    @Transform(({value}) => {
        if(typeof value !== "string"){
            throw new BadRequestException([{message: 'Category should be string', field: 'userId'}] as ErrorMessageType[]);
        }
        return value.trim()
    })
    category: string

    @IsString()
    @Transform(({value}) => {
        if(typeof value !== "string"){
            throw new BadRequestException([{message: 'Volume should be a string', field: 'userId'}] as ErrorMessageType[]);
        }
        return value.trim()
    })
    volume: string

    @IsString()
    @Transform(({value}) => {
        if(typeof value !== "string"){
            throw new BadRequestException([{message: 'Price should be a string', field: 'userId'}] as ErrorMessageType[]);
        }
        return value.trim()
    })
    price: string

    @IsString()
    @Transform(({value}) => {
        if(typeof value !== "string"){
            throw new BadRequestException([{message: 'Payment method should be a string', field: 'paymentMethod'}] as ErrorMessageType[]);
        }
        return value.trim()
    })
    paymentMethod: string

    @IsString()
    @Transform(({value}) => {
        if(typeof value !== "string"){
            throw new BadRequestException([{message: 'Point of sale should be a string', field: 'pointOfSale'}] as ErrorMessageType[]);
        }
        return value.trim()
    })
    pointOfSale: string

    @IsString()
    @Transform(({value}) => {
        if(typeof value !== "string"){
            throw new BadRequestException([{message: 'CreatedAt should be a string', field: 'createdAd'}] as ErrorMessageType[]);
        }
        return value.trim()
    })
    createdAt: string
}