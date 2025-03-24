import {HttpStatus, INestApplication} from "@nestjs/common";
import {CreateNewSaleInputModel} from "../../../src/features/sales/api/models/input/createNewSale.input.model";
import {SaleOutputModel} from "../../../src/features/sales/api/models/output/sale.output.model";
import request from "supertest";
import {CategoryOutputModel} from "../../../src/features/reference-data/api/models/output/allCategories.output.model";


export class CategoryTestManagers {
    constructor(private app: INestApplication) {
    }

    async createCategory(token: string, data: { title: string }, status = HttpStatus.CREATED) {
        const res = await request(this.app.getHttpServer())
            .post('/category')
            .auth(token, {type: 'bearer'})
            .send(data)
            .expect(status)
        return res.body;
    }

    async getAllCategories(token: string, status= HttpStatus.OK): Promise<CategoryOutputModel[]> {
        const res = await request(this.app.getHttpServer())
            .get('/category')
            .auth(token, {type: 'bearer'})
            .expect(status)
        return res.body;
    }


}