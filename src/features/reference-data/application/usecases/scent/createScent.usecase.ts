import {CategoryRepository} from "../../../infractructure/category.repository";
import {BadRequestException, Injectable, InternalServerErrorException} from "@nestjs/common";
import { CategoryOutputModel} from "../../../api/models/output/allCategories.output.model";
import {ErrorMessageType} from "../../../../../infrastructure/exception-filters/exeptions";
import {ScentRepository} from "../../../infractructure/scent.repository";


@Injectable()
export class CreateScentUsecase {
    constructor(private scentRepository: ScentRepository) {
    }

    async createScent(userId: string, title: string): Promise<CategoryOutputModel | null> {
        const findScent = await this.scentRepository.getScentByName(title);
        if (findScent) throw new BadRequestException([{
            message: 'Scent already exists',
            field: 'scent'
        }] as ErrorMessageType[]);
        try {
            const res = await this.scentRepository.createScent({userId, title})
            return {
                id: res.id,
                title: res.title

            }
        } catch (error) {
            throw new BadRequestException()
        }

    }
}