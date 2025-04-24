import {clearDatabase, closeTest, initializeTestSetup, testApp} from '../../../../test-setup';
import {AuthTestManager, userTestData} from '../../../testManagers/authTestManager';
import {LoginOutputModel} from "../../../../src/features/auth/api/models/output/login.output.model";
import {CategoryOutputModel} from "../../../../src/features/reference-data/api/models/output/allCategories.output.model";
import {ScentTestManagers} from "../../../testManagers/reference-data/scentTestManagers";


describe('test for POST sales', () => {
    let authTestManager: AuthTestManager;
    let scentTestManager: ScentTestManagers
    let token: string;
    beforeAll(async () => {
        await initializeTestSetup();
        authTestManager = new AuthTestManager(testApp);
        scentTestManager = new ScentTestManagers(testApp);
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
        await scentTestManager.createScent(token, {title: 'персиковый нектар'})
        await scentTestManager.createScent(token, {title: 'черное море'})
        await scentTestManager.createScent(token, {title: 'георгин'})
        const res: CategoryOutputModel = await scentTestManager.createScent(token, {title: 'нектар лунного цветка'})
        expect(res.title).toBe('нектар лунного цветка')

        const res2 = await scentTestManager.getAllScents(token)
        expect(res2.length).toBe(4)
    });


});