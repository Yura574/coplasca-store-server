import { Repository } from 'typeorm';
import { Image } from '../../Entities/Image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async uploadImage(imageData: Express.Multer.File): Promise<Image> {
    const image = new Image();
    image.name = imageData.originalname;
    image.data = imageData.buffer;

    return await this.imageRepository.save(image);
  }
}
