import {clearDatabase, closeTest, initializeTestSetup, testApp} from '../../../test-setup';
import {UsersTestManagers} from '../../testManagers/usersTestManagers';
import {UserInputModel} from '../../../src/features/users/api/models/input/createUser.input.model';
import {AuthTestManager, codeForTest, userTestData} from '../../testManagers/authTestManager';
import {HttpStatus} from '@nestjs/common';
import {parse} from 'cookie';
import {LoginOutputModel} from "../../../src/features/auth/api/models/output/login.output.model";
import {SalesTestManager} from "../../testManagers/salesTestManager";
import {CreateNewSaleInputModel} from "../../../src/features/sales/api/models/input/createNewSale.input.model";
import {ReturnViewModel} from "../../../src/features/1_commonTypes/returnViewModel";
import {SaleOutputModel} from "../../../src/features/sales/api/models/output/sale.output.model";


describe('test for DELETE sales', () => {
    let authTestManager: AuthTestManager;
    let salesTestManagers: SalesTestManager
    let token: string;
    beforeAll(async () => {
        await initializeTestSetup();
        authTestManager = new AuthTestManager(testApp);
        salesTestManagers = new SalesTestManager(testApp);
        await authTestManager.registrationTestUser();
        const login: LoginOutputModel = await authTestManager.login({
            loginOrEmail: userTestData.login,
            password: userTestData.password
        });
        token = login.accessToken;
    });
    beforeEach(async () => {
        await clearDatabase();
    });

    afterAll(async () => {
        await closeTest();
    });

    it('should be delete sale', async () => {
        await salesTestManagers.createTestSales(token)
        const res = await salesTestManagers.getSales(token)

        expect(res.items.length).toBe(7)
        await salesTestManagers.deleteSale(token, res.items[0].id)

        const res2= await salesTestManagers.getSales(token)
        expect(res2.items.length).toBe(6)


    });


});