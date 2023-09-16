import { Controller, Post } from '@nestjs/common';
import { CategoryService } from './Category.service';
import { CategoryDto } from '../../Entities/dto/categoryDto';

@Controller()
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  createCategory(dto: CategoryDto) {
    return this.categoryService.createCategory(dto);
  }
}
