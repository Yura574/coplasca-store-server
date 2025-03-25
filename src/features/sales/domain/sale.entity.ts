import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";
import {IsArray} from "class-validator";


export type SaleDocument = HydratedDocument<Sale>

class SaleDataInfo {
    @Prop()
    category: string

    @Prop()
    scent: string


}

@Schema()
export class Sale {
    @Prop()
    userId: string


    @Prop({ type: [SaleDataInfo], default: [],_id: false})
    @IsArray()
    saleDataInfo: SaleDataInfo[]

    @Prop()
    paymentMethod: string

    @Prop()
    price: string

    @Prop()
    pointOfSale: string

    @Prop()
    createdAt: Date

}
// @Schema()
// export class Sale {
//     @Prop()
//     userId: string
//
//     @Prop()
//     scent: string
//
//     @Prop()
//     category: string
//
//     @Prop()
//     volume: string
//
//     @Prop()
//     price: string
//
//     @Prop()
//     paymentMethod: string
//
//     @Prop()
//     pointOfSale: string
//
//     @Prop()
//     createdAt: string
//
// }

export const SaleSchema = SchemaFactory.createForClass(Sale);