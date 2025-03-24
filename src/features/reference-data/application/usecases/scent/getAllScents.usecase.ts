import {Injectable} from "@nestjs/common";
import {ScentRepository} from "../../../infractructure/scent.repository";

@Injectable()
export class GetAllScentsUsecase {
    constructor(private scentRepository: ScentRepository) {
    }


    async getAllScents(userId: string) {
        const res = await this.scentRepository.getAllScents(userId)
        return res.map(el => {
            return {id: el.id, title: el.title}
        })
    }

}