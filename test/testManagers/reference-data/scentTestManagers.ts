import {HttpStatus, INestApplication} from "@nestjs/common";
import {CreateNewSaleInputModel} from "../../../src/features/sales/api/models/input/createNewSale.input.model";
import {SaleOutputModel} from "../../../src/features/sales/api/models/output/sale.output.model";
import request from "supertest";
import {CategoryOutputModel} from "../../../src/features/reference-data/api/models/output/allCategories.output.model";


export class ScentTestManagers {
    constructor(private app: INestApplication) {
    }

    async createScent(token: string, data: { title: string }, status = HttpStatus.CREATED) {
        const res = await request(this.app.getHttpServer())
            .post('/scent')
            .auth(token, {type: 'bearer'})
            .send(data)
            .expect(status)
        return res.body;
    }

    async getAllScents(token: string, status= HttpStatus.OK): Promise<CategoryOutputModel[]> {
        const res = await request(this.app.getHttpServer())
            .get('/scent')
            .auth(token, {type: 'bearer'})
            .expect(status)
        return res.body;
    }


}