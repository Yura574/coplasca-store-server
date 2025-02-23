import {clearDatabase, closeTest, initializeTestSetup, testApp} from '../../../test-setup';
import {UsersTestManagers} from '../../testManagers/usersTestManagers';
import {UserInputModel} from '../../../src/features/users/api/models/input/createUser.input.model';
import {AuthTestManager, codeForTest, userTestData} from '../../testManagers/authTestManager';
import {HttpStatus} from '@nestjs/common';
import {parse} from 'cookie';
import {LoginOutputModel} from "../../../src/features/auth/api/models/output/login.output.model";
import {SalesTestManager} from "../../testManagers/salesTestManager";
import {CreateNewSaleInputModel} from "../../../src/features/sales/api/models/input/createNewSale.input.model";


describe('test for POST sales', () => {
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

    it('should create new sale ', async () => {
        const dto: CreateNewSaleInputModel = {
            category: 'свеча',
            scent: 'черное море',
            volume: '100мл',
            price: '30',
            paymentMethod: 'нал',
        }
       const res =  await salesTestManagers.createSales(token, dto)
        console.log(res)

    });


});