import {HttpStatus, INestApplication} from "@nestjs/common";
import {CreateNewSaleInputModel} from "../../src/features/sales/api/models/input/createNewSale.input.model";
import request from "supertest";
import {SaleOutputModel} from "../../src/features/sales/api/models/output/sale.output.model";


export class SalesTestManager {
    constructor(private app: INestApplication) {
    }

    async createTestSales(token: string, status=HttpStatus.CREATED) {
        const dto: CreateNewSaleInputModel[] = [
            {category: 'свеча', scent: 'черное море', volume: '100мл', price: '30', paymentMethod: 'нал',},
            {category: 'свеча', scent: 'табак сантал', volume: '100мл', price: '30', paymentMethod: 'нал',},
            {category: 'свеча', scent: 'черное море', volume: '100мл', price: '30', paymentMethod: 'нал',},
            {category: 'свеча', scent: 'кедр и амбра', volume: '100мл', price: '30', paymentMethod: 'нал',},
            {category: 'свеча', scent: 'черное море', volume: '100мл', price: '30', paymentMethod: 'нал',},
            {category: 'свеча', scent: 'табак шафран', volume: '100мл', price: '30', paymentMethod: 'нал',},
            {category: 'свеча', scent: 'черное море', volume: '100мл', price: '30', paymentMethod: 'нал',},
        ]
        const sales: SaleOutputModel[] = []

        for (let i = 0; i < dto.length; i++) {
            const res = await request(this.app.getHttpServer())
                .post('/sales')
                .auth(token, {type: 'bearer'})
                .send(dto[i])
                .expect(status)
            sales.push(res.body)
        }
        return sales;


    }

    async createSales(token: string, dto?: CreateNewSaleInputModel, status = HttpStatus.CREATED) {
        const res = await request(this.app.getHttpServer())
            .post('/sales')
            .auth(token, {type: 'bearer'})
            .send(dto)
            .expect(status)
        return res.body
    }

    async getSales(token: string, status = HttpStatus.OK) {
        const res = await request(this.app.getHttpServer())
            .get('/sales')
            .auth(token, {type: 'bearer'})
            .expect(status)
        return res.body
    }
}