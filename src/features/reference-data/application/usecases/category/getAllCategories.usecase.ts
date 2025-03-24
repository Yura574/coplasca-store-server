import {Injectable} from "@nestjs/common";
import {CategoryRepository} from "../../../infractructure/category.repository";

@Injectable()
export class GetAllCategoriesUsecase  {
    constructor(private categoryRepository: CategoryRepository) {
    }


    async getAllCategories(userId: string) {
        const res = await this.categoryRepository.getAllCategories(userId)
        return res.map(el => {
            return {id: el.id, title: el.title}
        })
    }

}