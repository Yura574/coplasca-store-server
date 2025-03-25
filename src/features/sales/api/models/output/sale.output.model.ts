import {SaleDataInfoType} from "../types/saleDataInfoType";


export type SaleOutputModel = {
    id: string
    userId: string
    saleDataInfo: SaleDataInfoType[]
    price: string
    paymentMethod: string
    pointOfSale: string
    createdAt: Date
}