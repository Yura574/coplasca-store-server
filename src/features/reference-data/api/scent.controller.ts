import {Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards} from "@nestjs/common";
import {AuthGuard} from "../../../infrastructure/guards/auth.guard";
import {NewCategoryInputModel} from "./models/input/newCategory.input.model";
import {RequestType} from "../../1_commonTypes/commonTypes";
import {CreateScentUsecase} from "../application/usecases/scent/createScent.usecase";
import {GetAllScentsUsecase} from "../application/usecases/scent/getAllScents.usecase";
import {NewScentInputModel} from "./models/input/newScent.input.model";
import {getLogger} from "nodemailer/lib/shared";

@Controller('scent')
export class ScentController {
    constructor(
        private createScentUseCase: CreateScentUsecase,
        private getAllScentsUseCase: GetAllScentsUsecase
    ) {
    }

    @UseGuards(AuthGuard)
    @Post()
    async createScent(@Req() req: RequestType<{}, NewScentInputModel, {}>,
                      @Body() body: NewScentInputModel
                      ) {
        // console.log(req.body)
        if (!req.user) throw new UnauthorizedException("User not found");
        console.log(req.body)
        return await this.createScentUseCase.createScent(req.user.userId, req.body.title)
    }

    @UseGuards(AuthGuard)
    @Get()
    async getAllScents(@Req() req: RequestType<{}, {}, {}>) {
        if (!req.user) throw new UnauthorizedException("User not found");
        return await this.getAllScentsUseCase.getAllScents(req.user.userId);
    }
}