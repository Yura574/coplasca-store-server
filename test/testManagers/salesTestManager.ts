import {HttpStatus, INestApplication} from "@nestjs/common";
import {CreateNewSaleInputModel} from "../../src/features/sales/api/models/input/createNewSale.input.model";
import request from "supertest";
import {SaleOutputModel} from "../../src/features/sales/api/models/output/sale.output.model";


export class SalesTestManager {
    constructor(private app: INestApplication) {
    }

    async createTestSales(token: string, status = HttpStatus.CREATED) {
        const dto: CreateNewSaleInputModel[] = [
            {
                saleDataInfo: [
                    {category: 'свеча 30мл', scent: 'табак сантал'},
                    {category: 'свеча 100мл', scent: 'черное море'},
                    {category: 'духи', scent: 'черная смородина и жасмин'},
                ],
                price: '55',
                paymentMethod: 'нал',
            },
            {
                saleDataInfo: [
                    {category: 'свеча 30мл', scent: 'табак сантал'},
                    {category: 'свеча 200мл', scent: 'георгин'},
                    {category: 'духи', scent: 'сантал кокос'},
                ],
                price: '65',
                paymentMethod: 'нал',
            },
            {
                saleDataInfo: [
                    {category: 'свеча 100мл', scent: 'персиковый нектар'},
                ],
                price: '30',
                paymentMethod: 'нал',
            },
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
            // .expect(status)
        return res.body
    }

    async getSales(token: string, status = HttpStatus.OK) {
        const res = await request(this.app.getHttpServer())
            .get('/sales')
            .auth(token, {type: 'bearer'})
            .expect(status)
        return res.body
    }

    async deleteSale(token: string, saleId: string, status = HttpStatus.NO_CONTENT) {
        const res = await request(this.app.getHttpServer())
            .delete(`/sales/${saleId}`)
            .auth(token, {type: 'bearer'})
            .expect(status)

    }
}