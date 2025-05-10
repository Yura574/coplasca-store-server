import {Injectable} from "@nestjs/common";
import {SaleRepository} from "../../infractructure/sale.repository";
import {CreateNewSale} from "../../utils/createNewSale";
import {HydratedDocument} from "mongoose";
import {SaleDocument} from "../../domain/sale.entity";
import {CreateNewSaleInputModel} from "../../api/models/input/createNewSale.input.model";


@Injectable()
export class CreateSaleUsecase {
    constructor(private saleRepository: SaleRepository) {
    }

    async createSale(userId: string, dto: CreateNewSaleInputModel) {
      // console.log(dto);
        const newSale = new CreateNewSale(userId, dto)
        const sale: HydratedDocument<SaleDocument> = await this.saleRepository.createSale(newSale)
        return sale.id
    }
}