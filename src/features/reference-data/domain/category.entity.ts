import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";


export type CategoryDocument = HydratedDocument<Category>



@Schema()
export class Category {

    @Prop({ required: true })
    userId: string

    @Prop({required: true})
    title: string
    
}


export const CategorySchema = SchemaFactory.createForClass(Category);
CategorySchema.index({ userId: 1, title: 1 }, { unique: true });