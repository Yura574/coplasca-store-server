import {CreateNewSaleInputModel} from "../api/models/input/createNewSale.input.model";

interface CreateNewSaleInterface {
    userId: string;
    scent: string
    category: string
    volume: string
    price: string
    createdAt: string
    pointOfSale: string
    paymentMethod: string
}

export class CreateNewSale implements CreateNewSaleInterface{
    userId: string;
    scent: string
    category: string
    volume: string
    price: string
    createdAt: string
    pointOfSale: string
    paymentMethod: string

    constructor(userId: string, dto: CreateNewSaleInputModel) {
        const { scent, category, volume, price, createdAt, pointOfSale, paymentMethod} = dto;
        this.userId = userId
        this.scent = scent ? scent : ''
        this.category = category ? category : ''
        this.volume = volume ? volume : ''
        this.price = price ? price  : ''
        this.createdAt = createdAt? createdAt : new Date().toString()
        this.pointOfSale = pointOfSale ? pointOfSale : ''
        this.paymentMethod = paymentMethod ? paymentMethod : ''
    }

}