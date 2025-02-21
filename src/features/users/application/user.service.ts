import {BadRequestException, Injectable} from "@nestjs/common";
import {UserRepository} from "../infracture/user.repository";
import {CreateNewUserType} from "../api/types/createNewUser.type";
import {CreateUserInputModel} from "../api/inputModel/createUser.input.model";
import {NewUser} from "../../utils/createUser";


@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {
    }

    async createUser(data: CreateUserInputModel){
        const newUser: CreateNewUserType = new NewUser(data)
        const isUnique = await this.userRepository.isUniqueUser(newUser.email, newUser.login)
        if(isUnique.length> 0){
            throw new BadRequestException(isUnique)
        }
        return await this.userRepository.createUser(newUser)
    }
    async getUsers(){
        return await this.userRepository.getUsers()
    }
    async getUserById(id: string){
        return await this.userRepository.getUserById(id)
    }
}