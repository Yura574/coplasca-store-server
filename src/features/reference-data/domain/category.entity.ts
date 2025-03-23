import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";


export type CategoryDocument = HydratedDocument<Category>



@Schema()
export class Category {

    @Prop()
    userId: string

    @Prop({required: true, unique: true})
    category: string
    
}


export const CategorySchema = SchemaFactory.createForClass(Category);