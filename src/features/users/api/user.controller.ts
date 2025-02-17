import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {UserService} from "../application/user.service";
import {CreateUserInputModel} from "./inputModel/createUser.input.model";


@Controller('users')
export class UserController {
    constructor(private userService: UserService) {
    }
    @Post()
    async createUser(@Body()body: CreateUserInputModel){
        return await this.userService.createUser(body)
    }
    @Get()
    async getUsers(){
        return await this.userService.getUsers()
    }
    @Get()
    async getUserById(@Param('id') param: any){
        return await this.userService.getUserById(param.id)
    }
}