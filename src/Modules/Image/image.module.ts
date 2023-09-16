import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ImageController } from './image.controller'
import { ImageService } from './image.service'
import { Image } from '../../Entities/Image.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
