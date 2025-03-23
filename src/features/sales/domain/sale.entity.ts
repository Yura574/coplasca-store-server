import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";


export type SaleDocument = HydratedDocument<Sale>

@Schema()
export class Sale {
    @Prop()
    userId: string

    @Prop()
    scent: string

    @Prop()
    category: string

    @Prop()
    volume: string

    @Prop()
    price: string

    @Prop()
    paymentMethod: string

    @Prop()
    pointOfSale: string

    @Prop()
    createdAt: string

}

export const SaleSchema = SchemaFactory.createForClass(Sale);