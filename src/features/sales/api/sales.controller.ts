import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post, Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {CreateNewSaleInputModel} from "./models/input/createNewSale.input.model";
import {AuthGuard} from "../../../infrastructure/guards/auth.guard";
import {CreateSaleUsecase} from "../application/usecases/createSale.usecase";
import {SaleOutputModel} from "./models/output/sale.output.model";
import {GetSaleByIdUsecase} from "../application/usecases/getSaleById.usecase";
import {RequestType} from "../../1_commonTypes/commonTypes";
import {GetSalesUsecase} from "../application/usecases/getSales.usecase";
import {ReturnViewModel} from "../../1_commonTypes/returnViewModel";
import {QueryGetSalesType} from "./models/types/querySalesType";
import {DeleteSaleParamsType} from "./models/types/deleteSaleParams";
import {DeleteSaleUsecase} from "../application/usecases/deleteSale.usecase";


@Controller('sales')
export class SalesController {
    constructor(private createSaleUsecase: CreateSaleUsecase,
                private getSaleByIdUsecase: GetSaleByIdUsecase,
                private getSalesUsecase: GetSalesUsecase,
                private deleteSalesUsecase: DeleteSaleUsecase,
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
      // console.log('create controller', dto);
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
      console.log(req.query);
        return await this.getSalesUsecase.getSales(userId, req.query)

    }

    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    async deleteSale(@Req() req: RequestType<DeleteSaleParamsType, {}, {}>) {
        return await this.deleteSalesUsecase.deleteSale(req.params.id)
    }
}