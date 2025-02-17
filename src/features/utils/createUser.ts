import {CreateUserInputModel} from "../users/api/inputModel/createUser.input.model";
import {CreateNewUserType} from "../users/api/types/createNewUser.type";


export class NewUser {
   login: string
   email: string
   password: string
   createdAt: string

    constructor(userData: CreateUserInputModel) {
       const {email, password,login}= userData;
       this.login = login;
       this.email = email;
       this.password = password;
       this.createdAt = new Date().toISOString();
    }


}