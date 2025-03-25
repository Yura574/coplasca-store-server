import {Injectable} from "@nestjs/common";
import {SaleOutputModel} from "../../api/models/output/sale.output.model";
import {ReturnViewModel} from "../../../1_commonTypes/returnViewModel";
import {QueryGetSalesType} from "../../api/models/types/querySalesType";
import {InjectModel} from "@nestjs/mongoose";
import {Sale, SaleDocument} from "../../domain/sale.entity";
import {Model} from "mongoose";


@Injectable()
export class GetSalesUsecase {
    constructor(@InjectModel(Sale.name) private saleModel: Model<SaleDocument>) {
    }

    async getSales(userId: string, query: QueryGetSalesType): Promise<ReturnViewModel<SaleOutputModel[]>> {
        const {pageSize = 10, pageNumber = 1, searchScentTerm, sortBy = 'createdAt', sortDirection} = query

        const searchQuery =
            searchScentTerm ? {
                name: {$regex: new RegExp(searchScentTerm, 'i')},
                userId
            } : {
            userId
            };
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); // 1-е число текущего месяца
        const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        const skip = (+pageNumber - 1) * +pageNumber;
        const sort: any = {};
        sort[sortBy] = sortDirection === 'asc' ? 1 : -1;

        const salesCount = await this.saleModel.countDocuments(searchQuery);
        const pagesCount = Math.ceil(salesCount / pageSize);

        const sales = await this.saleModel.find({...searchQuery, createdAt: {$gte: startOfMonth, $lt: startOfNextMonth}, pointOfSale: ''}).sort(sort).skip(skip);
        const returnItems: SaleOutputModel[] = sales.map((sale: SaleDocument): SaleOutputModel => {
            return {
                id: sale.id,
                userId: sale.userId,
                saleDataInfo: sale.saleDataInfo,
                price: sale.price,
                paymentMethod: sale.paymentMethod,
                pointOfSale: sale.pointOfSale,
                createdAt: sale.createdAt,
            }
        })

        return {
            page: pageNumber,
            pageSize,
            pagesCount,
            totalCount: salesCount,
            items: returnItems
        }
    }
}