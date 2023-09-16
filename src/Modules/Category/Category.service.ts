import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../Entities/category.entity';
import { Repository } from 'typeorm';
import { CategoryDto } from '../../Entities/dto/categoryDto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createCategory(dto: CategoryDto) {
    console.log(dto);
    return 'sd';
  }
}
