import {Injectable} from "@nestjs/common";
import {SaleRepository} from "../../infractructure/sale.repository";
import {CreateNewSale} from "../../utils/createNewSale";
import {HydratedDocument} from "mongoose";
import {SaleDocument} from "../../domain/sale.entity";


@Injectable()
export class CreateSaleUsecase {
    constructor(private saleRepository: SaleRepository) {
    }

    async createSale(dto: CreateNewSale) {
        const sale: HydratedDocument<SaleDocument> = await this.saleRepository.createSale(dto)
        return sale.id
    }
}