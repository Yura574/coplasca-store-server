import {Body, Controller, Post, UseGuards} from "@nestjs/common";
import {SaleInputModel} from "./models/input/sale.input.model";
import {AuthGuard} from "../../../infrastructure/guards/auth.guard";
import {CreateNewSale} from "../utils/createNewSale";
import {CreateSaleUsecase} from "../application/usecases/createSale.usecase";
import {SaleOutputModel} from "./models/output/sale.output.model";
import {GetSaleByIdUsecase} from "../application/usecases/getSaleById.usecase";


@Controller('sales')
export class SalesController {
    constructor(private createSaleUsecase: CreateSaleUsecase,
                private getSaleByIdUsecase: GetSaleByIdUsecase) {
    }

    @UseGuards(AuthGuard)
    @Post()
    async createSale(@Body() dto: SaleInputModel): Promise<SaleOutputModel> {
        const newSale = new CreateNewSale(dto)
        const saleId:string = await this.createSaleUsecase.createSale(newSale)
        return  await this.getSaleByIdUsecase.getSaleById(saleId)

    }
}