import { Module } from '@nestjs/common';
import { CategoryService } from './Category.service';
import { CategoryController } from './Category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../../Entities/category.entity';

@Module({
  providers: [CategoryService],
  controllers: [CategoryController],
  imports: [TypeOrmModule.forFeature([Category])],
  exports: [CategoryService],
})
export class CategoryModule {}
