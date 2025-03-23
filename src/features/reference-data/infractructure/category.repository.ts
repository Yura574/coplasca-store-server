import {InjectModel} from "@nestjs/mongoose";
import {Category, CategoryDocument} from "../domain/category.entity";
import {Injectable} from "@nestjs/common";
import {Model} from "mongoose";
import {CreateNewCategoryType} from "../api/models/types/createNewCategoryType";


@Injectable()
export class CategoryRepository {
    constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>) {
    }

    async createCategory(data: CreateNewCategoryType) {
        return await this.categoryModel.create(data)
    }

    async getCategoryById(id: string) {
        return this.categoryModel.findOne({_id: id});
    }

    async getCategoryByName(category: string) {
        return this.categoryModel.findOne({category});
    }

    async getAllCategories(userId: string) {
        return  this.categoryModel.find({userId})
    }
}