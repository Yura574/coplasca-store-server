import {Controller, Delete, Get, HttpCode, HttpStatus} from '@nestjs/common';
import { AppService } from './app.service';
import * as process from "node:process";

@Controller('testing')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Delete('all-data')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAllData(){
    return await this.appService.deleteAllData()
  }
}
