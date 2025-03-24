import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";


export type ScentDocument = HydratedDocument<Scent>



@Schema()
export class Scent {

    @Prop()
    userId: string

    @Prop({required: true})
    title: string
    
}


export const ScentSchema = SchemaFactory.createForClass(Scent);