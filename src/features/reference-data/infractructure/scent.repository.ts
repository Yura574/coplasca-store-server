import {InjectModel} from "@nestjs/mongoose";
import {Category, CategoryDocument} from "../domain/category.entity";
import {Injectable} from "@nestjs/common";
import {Model} from "mongoose";
import {CreateNewCategoryType} from "../api/models/types/createNewCategoryType";
import {Scent, ScentDocument} from "../domain/scent.entity";


@Injectable()
export class ScentRepository {
    constructor(@InjectModel(Scent.name) private scentModel: Model<ScentDocument>) {
    }

    async createScent(data: CreateNewCategoryType) {
        return await this.scentModel.create(data)
    }

    async getScentById(id: string) {
        return this.scentModel.findOne({_id: id});
    }

    async getScentByName(title: string) {
        return this.scentModel.findOne({title});
    }

    async getAllScents(userId: string) {
        return  this.scentModel.find({userId})
    }
}