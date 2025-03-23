import {CategoryRepository} from "../../infractructure/category.repository";
import {BadRequestException, Injectable, InternalServerErrorException} from "@nestjs/common";
import { CategoryOutputModel} from "../../api/models/output/allCategories.output.model";
import {ErrorMessageType} from "../../../../infrastructure/exception-filters/exeptions";


@Injectable()
export class CreateCategoryUsecase {
    constructor(private categoryRepository: CategoryRepository) {
    }

    async createCategory(userId: string, category: string): Promise<CategoryOutputModel | null> {
        const findCategory = await this.categoryRepository.getCategoryByName(category);
        if (findCategory) throw new BadRequestException([{
            message: 'Category already exists',
            field: 'category'
        }] as ErrorMessageType[]);
        try {
            const res = await this.categoryRepository.createCategory({userId, category})
            return {
                id: res.id,
                category: res.category

            }
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException()
        }

    }
}