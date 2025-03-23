import {SaleDataInfoType} from "../types/saleDataInfoType";


export type SaleOutputModel = {
    id: string
    userId: string
    saleDataInfo: SaleDataInfoType[]
    // scent: string
    // category: string
    // volume: string
    price: string
    paymentMethod: string
    pointOfSale: string
    createdAt: string
}