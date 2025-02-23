import {Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards} from "@nestjs/common";
import {CreateNewSaleInputModel} from "./models/input/createNewSale.input.model";
import {AuthGuard} from "../../../infrastructure/guards/auth.guard";
import {CreateSaleUsecase} from "../application/usecases/createSale.usecase";
import {SaleOutputModel} from "./models/output/sale.output.model";
import {GetSaleByIdUsecase} from "../application/usecases/getSaleById.usecase";
import {RequestType} from "../../1_commonTypes/commonTypes";
import {GetSalesUsecase} from "../application/usecases/getSales.usecase";
import {ReturnViewModel} from "../../1_commonTypes/returnViewModel";
import {QueryGetSalesType} from "./models/types/querySalesType";


@Controller('sales')
export class SalesController {
    constructor(private createSaleUsecase: CreateSaleUsecase,
                private getSaleByIdUsecase: GetSaleByIdUsecase,
                private getSalesUsecase: GetSalesUsecase,
    ) {
    }

    @UseGuards(AuthGuard)
    @Post()
    async createSale(@Body() dto: CreateNewSaleInputModel,
                     @Req() req: RequestType<{}, {}, {}>): Promise<SaleOutputModel> {
        const user = req.user;
        if (!user) {
            throw new UnauthorizedException()
        }

        const saleId: string = await this.createSaleUsecase.createSale(user.userId, dto)
        return await this.getSaleByIdUsecase.getSaleById(saleId)
    }

    @UseGuards(AuthGuard)
    @Get()
    async getSales(@Req() req: RequestType<{}, {}, QueryGetSalesType>): Promise<ReturnViewModel<SaleOutputModel[]>> {
        const userId = req.user?.userId;
        if (!userId) {
            throw new UnauthorizedException()
        }

        return await this.getSalesUsecase.getSales(userId, req.query)

    }


}