import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";


export type SaleDocument = HydratedDocument<Sale>

@Schema()
export class Sale {
    @Prop({ required: true })
    userId: string

    @Prop({ required: true })
    scent: string

    @Prop({ required: true })
    category: string

    @Prop({ required: true })
    volume: string

    @Prop({ required: true })
    price: string

    @Prop()
    paymentMethod: string

    @Prop()
    pointOfSale: string

    @Prop({ required: true })
    createdAt: string

}

export const SaleSchema = SchemaFactory.createForClass(Sale);