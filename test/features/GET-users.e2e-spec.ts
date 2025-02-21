import {HttpStatus} from '@nestjs/common';
import * as request from 'supertest';
import {UsersTestManagers} from "../testManagers/usersTestManagers";
import {clearDatabase, closeTest, initializeTestSetup, testApp} from "../../test-setup";

describe('AppController (e2e)', () => {

    let userTestManager: UsersTestManagers


    beforeAll(async () => {
        await initializeTestSetup();
        userTestManager = new UsersTestManagers(testApp);
    });

    beforeEach(async () => await clearDatabase());

    afterEach(async () => {
        await clearDatabase();
        await testApp.close(); // Закрываем приложение
    });

    afterAll(async () => await closeTest());

    it('get all users', async () => {
        for (let i = 0; i < 5; i++) {
            const dto: any = {
                email: `email-test${i}@gmail.com`,
                login: `login${i}`,
                password: 'unbiliever13'
            };
            await userTestManager.createUser(dto, HttpStatus.CREATED);

        }

        const res = await request(testApp.getHttpServer())
            .get('/users')
            .expect(200);

        expect(res.body.length).toBe(5);
        await request(testApp.getHttpServer())
            .delete('/testing/all-data')
            .expect(204);

        const res2 = await request(testApp.getHttpServer())
            .get('/users')
            .expect(200);
        expect(res2.body.length).toBe(0);
    });


});
