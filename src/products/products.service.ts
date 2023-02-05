import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import {
  Category,
  CategoryDocument,
} from 'src/categories/schemas/category.schema';
import { FilesService } from 'src/files/files.service';
import { LangSearchI } from 'src/global/dto/lang-search.input';
import removeNullishAttrs from 'src/utils/removeNullishAttrs';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
    @InjectModel(Category.name)
    private categoryModel: Model<CategoryDocument>,
    private filesService: FilesService,
  ) {}

  getProducts(
    nameSearch?: LangSearchI,
    categoryId?: string,
    descCreatedAt?: boolean,
  ) {
    const conditions: FilterQuery<ProductDocument> = {};

    if (nameSearch) {
      const value = nameSearch.value.trim().replace(/\s+/, ' ');

      conditions[`name.${nameSearch.lang}`] = new RegExp(value, 'i');
    }

    if (categoryId) {
      conditions.categoryId = categoryId;
    }

    return this.productModel
      .find(conditions)
      .sort({ createdAt: descCreatedAt ? -1 : 1 });
  }

  getProduct(_id: string) {
    return this.productModel.findOne({ _id });
  }

  async createProduct(input: CreateProductInput) {
    const { _id } = await this.productModel.create({
      ...input,
      name: {
        en: input.name.en.trim().replace(/\s+/, ' '),
        es: input.name.es.trim().replace(/\s+/, ' '),
      },
    });

    return this.productModel.findOne({ _id });
  }

  async updateProduct({ _id, ...input }: UpdateProductInput) {
    const updated = removeNullishAttrs({
      ...input,
      name: input.name
        ? {
            en: input.name.en.trim().replace(/\s+/, ' '),
            es: input.name.es.trim().replace(/\s+/, ' '),
          }
        : undefined,
    });

    await this.productModel.updateOne({ _id }, updated);

    return this.productModel.findOne({ _id });
  }

  async deleteProductFiles(product: Product) {
    const fileUrls: string[] = [];

    if (product.thumbnail) fileUrls.push(product.thumbnail);

    product.gallery.forEach((f) => fileUrls.push(f));
    product.traces.forEach((t) => t.gallery.forEach((f) => fileUrls.push(f)));
    product.certifications.forEach((f) => fileUrls.push(f));

    const filenames = fileUrls.map(
      (fileUrl) => fileUrl.split('/').slice(-1)[0],
    );

    await this.filesService.deleteFiles(filenames);
  }

  async deleteProduct(_id: string) {
    const product = await this.productModel.findOne({ _id });
    if (!product) return true;

    await this.productModel.deleteOne({ _id });
    await this.deleteProductFiles(product);
    return true;
  }

  async getProductCategory(categoryId: string) {
    return this.categoryModel.findOne({ _id: categoryId });
  }
}
