import {Injectable, NotFoundException} from "@nestjs/common";
import {SaleRepository} from "../../infractructure/sale.repository";
import {CreateNewSale} from "../../utils/createNewSale";
import {HydratedDocument} from "mongoose";
import {SaleDocument} from "../../domain/sale.entity";
import {SaleOutputModel} from "../../api/models/output/sale.output.model";


@Injectable()
export class GetSaleByIdUsecase {
    constructor(private saleRepository: SaleRepository) {
    }

    async getSaleById(saleId: string) {
        const sale: HydratedDocument<SaleDocument> | null = await this.saleRepository.getSaleById(saleId)
        if(!sale) throw new NotFoundException("Sale not found");
        const {saleDataInfo, price, id, pointOfSale, userId, paymentMethod, createdAt} = sale
        const returnedSale: SaleOutputModel = {
            id,
            userId,
            saleDataInfo,
            price,
            paymentMethod,
            pointOfSale,
            createdAt
        }
        return returnedSale
    }
}