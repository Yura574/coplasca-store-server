import {Injectable, InternalServerErrorException, NotFoundException} from "@nestjs/common";
import {SaleRepository} from "../../infractructure/sale.repository";
import {Types} from "mongoose";


@Injectable()
export class DeleteSaleUsecase {
    constructor(private saleRepository: SaleRepository) {
    }

    async deleteSale(saleId: string) {
        if (!Types.ObjectId.isValid(saleId)) throw new NotFoundException();

        const res = await this.saleRepository.deleteSale(saleId)
        if (res.deletedCount === 0) throw new NotFoundException();

        return res
    }
}