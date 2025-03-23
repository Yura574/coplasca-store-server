import {CreateNewSaleInputModel} from "../api/models/input/createNewSale.input.model";
import {SaleDataInfoType} from "../api/models/types/saleDataInfoType";

interface CreateNewSaleInterface {
    userId: string;
    saleDataInfo: SaleDataInfoType[]
    price: string
    createdAt: string
    pointOfSale: string
    paymentMethod: string
}

export class CreateNewSale implements CreateNewSaleInterface{
    userId: string;
    saleDataInfo: SaleDataInfoType[];
    price: string
    createdAt: string
    pointOfSale: string
    paymentMethod: string

    constructor(userId: string, dto: CreateNewSaleInputModel) {
        const {saleDataInfo,  price, createdAt, pointOfSale, paymentMethod} = dto;
        this.userId = userId
        this.saleDataInfo = saleDataInfo? saleDataInfo : [];
        this.price = price ? price  : ''
        this.createdAt = createdAt? createdAt : new Date().toString()
        this.pointOfSale = pointOfSale ? pointOfSale : ''
        this.paymentMethod = paymentMethod ? paymentMethod : ''
    }

}