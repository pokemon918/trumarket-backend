import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilesService } from 'src/files/files.service';
import {
  Investment,
  InvestmentDocument,
} from 'src/investments/schemas/investment.schema';
import { Product, ProductDocument } from 'src/products/schemas/product.schema';
import removeNullishAttrs from 'src/utils/removeNullishAttrs';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category, CategoryDocument } from './schemas/category.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<CategoryDocument>,
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
    @InjectModel(Investment.name)
    private investmentModel: Model<InvestmentDocument>,
    private filesService: FilesService,
  ) {}

  findAll() {
    return this.categoryModel.find();
  }

  getCategory(_id: string) {
    return this.categoryModel.findOne({ _id });
  }

  create(input: CreateCategoryInput) {
    return this.categoryModel.create(input);
  }

  async updateCategory({ _id, ...input }: UpdateCategoryInput) {
    const updated = removeNullishAttrs(input);
    await this.categoryModel.updateOne({ _id }, updated);
    return this.categoryModel.findOne({ _id });
  }

  async deleteCategoryFiles(category: Category) {
    const fileUrls: string[] = [];

    if (category.thumbnail) fileUrls.push(category.thumbnail);

    const filenames = fileUrls.map(
      (fileUrl) => fileUrl.split('/').slice(-1)[0],
    );

    await this.filesService.deleteFiles(filenames);
  }

  async deleteCategory(_id: string) {
    const categoryProducts = await this.productModel.count({
      categoryId: _id,
    });

    const categoryInvestments = await this.investmentModel.count({
      categoryId: _id,
    });

    if (categoryProducts !== 0 || categoryInvestments !== 0)
      throw new BadRequestException();

    const category = await this.categoryModel.findOne({ _id });
    if (!category) return true;

    await this.categoryModel.deleteOne({ _id });
    await this.deleteCategoryFiles(category);

    return true;
  }
}
