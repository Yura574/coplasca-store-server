import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "../domain/user.entity";
import {Model} from "mongoose";
import {CreateNewUserType} from "../api/types/createNewUser.type";
import {ErrorMessageType, ErrorResponseType} from "../../../infrastructure/exceptions-filters/exceptions";


@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    }

    async createUser(user: CreateNewUserType) {
        try {
            return await this.userModel.create(user)
        } catch (error) {
            console.log(error.message);
            throw new Error(error.message)
        }
    }

    async isUniqueUser(email: string, login: string) {
        const errorsMessages: ErrorMessageType[] = []

        const isEmailExist = await this.userModel.findOne({email})
        if (isEmailExist) {
            errorsMessages.push({message: "Email is already exist", field: "email"})
        }
        const isLoginExist = await this.userModel.findOne({login})
        if (isLoginExist) {
            errorsMessages.push({message: "Login is already exist", field: "login"})
        }
        return errorsMessages
    }

    async getUsers() {
        return this.userModel.find()
    }

    async getUserById(id: string) {
        return this.userModel.find({id})
    }
}