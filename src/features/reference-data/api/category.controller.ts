import {Controller, Get, Post, Req, UnauthorizedException, UseGuards} from "@nestjs/common";
import {AuthGuard} from "../../../infrastructure/guards/auth.guard";
import {RequestType} from "../../1_commonTypes/commonTypes";
import {CreateCategoryUsecase} from "../application/usecases/category/createCategory.usecase";
import {GetAllCategoriesUsecase} from "../application/usecases/category/getAllCategories.usecase";
import {NewCategoryInputModel} from "./models/input/newCategory.input.model";

@Controller('category')
export class CategoryController {
    constructor(
        private createCategoryUseCase: CreateCategoryUsecase,
        private getAllCategoriesUseCase: GetAllCategoriesUsecase
    ) {
    }

    @UseGuards(AuthGuard)
    @Post()
    async createCategory(@Req() req: RequestType<{}, NewCategoryInputModel, {}>) {
        if (!req.user) throw new UnauthorizedException("User not found");
      console.log(1212);
        return await this.createCategoryUseCase.createCategory(req.user.userId, req.body.title)
    }

    @UseGuards(AuthGuard)
    @Get()
    async getAllCategories(@Req() req: RequestType<{}, {}, {}>) {
        if (!req.user) throw new UnauthorizedException("User not found");
        return await this.getAllCategoriesUseCase.getAllCategories(req.user.userId);
    }
}