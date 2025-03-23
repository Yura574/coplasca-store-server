import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Sale, SaleDocument} from "../domain/sale.entity";
import {Model} from "mongoose";
import {CreateNewSale} from "../utils/createNewSale";
import {QueryGetSalesType} from "../api/models/types/querySalesType";


@Injectable()
export class SaleRepository {
    constructor(@InjectModel(Sale.name) private saleModel: Model<SaleDocument>) {
    }

    async createSale(dto: CreateNewSale) {
        try {
            return await this.saleModel.create(dto)
        } catch (error) {
            console.log(error)
            throw new Error('Something went wrong')
        }
    }

    async getSaleById(saleId: string) {
        try {
            return await this.saleModel.findOne({_id: saleId})
        } catch (error) {
            console.log(error)
            throw new Error('Something went wrong')
        }
    }

    async deleteSale(saleId: string) {
        return this.saleModel.deleteOne({_id: saleId});
    }
}