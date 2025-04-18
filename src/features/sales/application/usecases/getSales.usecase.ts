import { BadRequestException, Injectable } from '@nestjs/common';
import { SaleOutputModel } from '../../api/models/output/sale.output.model';
import { ReturnViewModel } from '../../../1_commonTypes/returnViewModel';
import { QueryGetSalesType } from '../../api/models/types/querySalesType';
import { InjectModel } from '@nestjs/mongoose';
import { Sale, SaleDocument } from '../../domain/sale.entity';
import { Model } from 'mongoose';

@Injectable()
export class GetSalesUsecase {
  constructor(@InjectModel(Sale.name) private saleModel: Model<SaleDocument>) {}

  async getSales(
    userId: string,
    query: QueryGetSalesType,
  ): Promise<ReturnViewModel<SaleOutputModel[]>> {
    const {
      pageSize = 'unlimited',
      pageNumber = 1,
      searchScentTerm,
      sortBy = 'createdAt',
      sortDirection,
      pointOfSale,
      scent,
      paymentMethod,
      category,
      startDate = new Date(),
      endDate = '',
    } = query;
    if(startDate && endDate &&startDate > endDate) {throw new BadRequestException('Starting date more then ended date');}
    const searchQuery: any = searchScentTerm
      ? {
          name: { $regex: new RegExp(searchScentTerm, 'i') },
          userId,
        }
      : {
          userId,
        };
    if (pointOfSale !== undefined && pointOfSale !== '') {
      searchQuery.pointOfSale = pointOfSale;
    }
    if (scent !== undefined && scent !== '') {
      searchQuery.saleDataInfo = {
        $elemMatch: {
          scent: scent.trim(),
        },
      };
    }

    if (paymentMethod !== undefined && paymentMethod !== '') {
      console.log('paymentMethod', paymentMethod);
      searchQuery.paymentMethod = paymentMethod;
    }

    if (category !== undefined && category !== '') {
      searchQuery.saleDataInfo = {
        $elemMatch: {
          category: category.trim(),
        },
      };
    }

    const now = new Date(startDate);
    const end = endDate ? new Date(endDate): new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); // 1-е число текущего месяца
    const startOfNextMonth =endDate?  new Date(now.getFullYear(), now.getMonth()+1 , 1): new Date(end.getFullYear(), end.getMonth() + 1, 1);
    const skip = (+pageNumber - 1) * +pageNumber;
    const sort: any = {};
    console.log(startOfMonth);
    console.log(startOfNextMonth);
    sort[sortBy] = sortDirection === 'asc' ? 1 : -1;

    const salesCount = await this.saleModel.countDocuments({
      ...searchQuery,
      createdAt: { $gte: startOfMonth, $lt: startOfNextMonth },
    });

    const pagesCount = !!+pageSize ? Math.ceil(salesCount / +pageSize) : 1;

    const sales = await this.saleModel
      .find({
        ...searchQuery,
        createdAt: { $gte: startOfMonth, $lt: startOfNextMonth },
      })
      .sort(sort)
      .skip(skip);
const months = ['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','декабрь' ]
    console.log(months[new Date(startDate).getMonth()]);

    const returnItems: SaleOutputModel[] = sales.map(
      (sale: SaleDocument): SaleOutputModel => {
        return {
          id: sale.id,
          userId: sale.userId,
          saleDataInfo: sale.saleDataInfo,
          price: sale.price,
          paymentMethod: sale.paymentMethod,
          pointOfSale: sale.pointOfSale,
          createdAt: sale.createdAt,
        };
      },
    );

    return {
      page: pageNumber,
      pageSize: !!+pageSize ? pageSize : 'unlimited',
      pagesCount,
      totalCount: salesCount,
      filterValues: [],
      items: returnItems,
    };
  }
}
