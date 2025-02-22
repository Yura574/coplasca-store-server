import {SaleInputModel} from "../api/models/input/sale.input.model";


export class CreateNewSale {

    userId: string;
    scent: string
    category: string
    volume: string
    price: string
    createdAt: string
    pointOfSale: string
    paymentMethod: string

    constructor(dto: SaleInputModel) {
        const {userId, scent, category, volume, price, createdAt, pointOfSale, paymentMethod} = dto;
        this.userId = userId
        this.scent = scent ? scent : ''
        this.category = category ? category : ''
        this.volume = volume ? volume : ''
        this.price = price ? price  : ''
        this.createdAt = createdAt? createdAt : new Date().toDateString()
        this.pointOfSale = pointOfSale ? pointOfSale : ''
        this.paymentMethod = paymentMethod ? paymentMethod : ''
    }

}