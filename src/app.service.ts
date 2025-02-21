import { Injectable } from '@nestjs/common';
import {Connection} from "mongoose";
import {InjectConnection} from "@nestjs/mongoose";

@Injectable()
export class AppService {
  constructor(@InjectConnection() private readonly connection: Connection) {
  }
  async deleteAllData() {
    const collections = Object.keys(this.connection.collections)
    for (const collectionName of collections) {
      const collection = this.connection.collections[collectionName]
      await collection.deleteMany({})
    }
  }
}
