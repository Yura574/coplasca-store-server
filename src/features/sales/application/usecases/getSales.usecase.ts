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
      startDate = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1,
      ).toISOString(),
      endDate = new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0,
      ).toISOString(),
    } = query;

    console.log(endDate);

    if (startDate && endDate && startDate > endDate) {
      throw new BadRequestException('Starting date more then ended date');
    }
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

    const end = endDate ? new Date(endDate) : new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); // 1-е число текущего месяца
    const startOfNextMonth = endDate ? new Date(endDate) : new Date(end.getFullYear(), end.getMonth() + 1, 0);
    const skip = (+pageNumber - 1) * +pageNumber;
    const sort: any = {};
    sort[sortBy] = sortDirection === 'asc' ? 1 : -1;

    const salesCount = await this.saleModel.countDocuments({
      ...searchQuery,
      createdAt: { $gte: startOfMonth, $lt: startOfNextMonth },
    });

    const pagesCount = !!+pageSize ? Math.ceil(salesCount / +pageSize) : 1;

    const sales = await this.saleModel
      .find({
        ...searchQuery,
        userId,
        createdAt: { $gte: startOfMonth, $lte: startOfNextMonth },
      })
      .sort(sort)
      .skip(skip);
    const months = [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'декабря',
    ];
    const wholeMonths = [
      'январь',
      'февраль',
      'март',
      'апрель',
      'май',
      'июнь',
      'июль',
      'август',
      'сентябрь',
      'октябрь',
      'декабрь',
    ];
    // console.log(new Date(startDate).getDate());
    const filterValues: any = {};


    if (
      new Date(startDate).getDate() === startOfMonth.getDate() &&
      new Date(endDate).getDate() === startOfNextMonth.getDate()
    ) {
      filterValues.date = wholeMonths[new Date(startDate).getMonth()];
    } else {
      const startDateFilter =
        new Date(startDate).getDate() +
        ' ' +
        months[new Date(startDate).getMonth()];

      const endDateFilter =
        new Date(end).getDate() + ' ' + months[new Date(end).getMonth()];

      filterValues.date = startDateFilter + ' - ' + endDateFilter;
    }

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
      filterValues,
      items: returnItems,
    };
  }
}
