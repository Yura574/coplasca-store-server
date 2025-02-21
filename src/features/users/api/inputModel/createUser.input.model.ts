import {IsNotEmpty, IsString, Length, Matches} from "class-validator";
import {Transform} from "class-transformer";


export class CreateUserInputModel {
    @IsString()
    @Transform(({value}) => typeof value === "string" ? value.trim() : value)
    @IsNotEmpty({message: 'Name is required'})
    @Length(1,20, {message: 'Name length should be min 1 symbol, max 20 symbols'})
    @Matches(/^[a-zA-Z0-9_-]*$/, {
        message: 'Name must contain only letters, numbers, underscores, or dashes',
    })
    login: string;


    @IsString()
    @Transform(({value}) => typeof value === "string" ? value.trim() : '')
    @IsNotEmpty({message: 'Email is required'})
    @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, {
        message: `incorrect email. example: example@example.com`,
    })
    email: string;

    @IsString()
    @Transform(({value}) => typeof value === "string" ? value.trim() : value)
    @IsNotEmpty({message: 'Password is required'})
    @Length(8,30, {message: 'Password length should min 8 symbols, max 30 symbols'})
    password: string;
}