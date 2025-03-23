import {IsString} from "class-validator";


export class SaleDataInfoType {
    @IsString()
    category: string;

    @IsString()
    scent: string;
}