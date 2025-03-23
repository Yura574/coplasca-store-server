import {clearDatabase, closeTest, initializeTestSetup, testApp} from '../../../test-setup';
import {AuthTestManager, userTestData} from '../../testManagers/authTestManager';
import {LoginOutputModel} from "../../../src/features/auth/api/models/output/login.output.model";
import {CategoryTestManagers} from "../../testManagers/referenceDataTestManagers";
import {CategoryOutputModel} from "../../../src/features/reference-data/api/models/output/allCategories.output.model";


describe('test for POST sales', () => {
    let authTestManager: AuthTestManager;
    let categoryTestManagers: CategoryTestManagers
    let token: string;
    beforeAll(async () => {
        await initializeTestSetup();
        authTestManager = new AuthTestManager(testApp);
        categoryTestManagers = new CategoryTestManagers(testApp);
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
        await categoryTestManagers.createCategory(token, {category: 'свеча 100мл'})
        await categoryTestManagers.createCategory(token, {category: 'свеча 200мл'})
        await categoryTestManagers.createCategory(token, {category: 'свеча 300мл'})
        const res: CategoryOutputModel = await categoryTestManagers.createCategory(token, {category: 'духи'})
        expect(res.category).toBe('духи')

        const res2 = await categoryTestManagers.getAllCategories(token)
        expect(res2.length).toBe(4)
    });


});