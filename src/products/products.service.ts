import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
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
  ) {}

  getProducts(nameSearch?: LangSearchI, categoryId?: string) {
    const conditions: FilterQuery<ProductDocument> = {};

    if (nameSearch) {
      const value = nameSearch.value.trim().replace(/\s+/, ' ');

      conditions[`name.${nameSearch.lang}`] = new RegExp(value, 'i');
    }

    if (categoryId) {
      conditions.categoryId = categoryId;
    }

    return this.productModel.find(conditions).populate('category');
  }

  getProduct(_id: string) {
    return this.productModel.findOne({ _id }).populate('category');
  }

  async createProduct(input: CreateProductInput) {
    const { _id } = await this.productModel.create({
      ...input,
      name: {
        en: input.name.en.trim().replace(/\s+/, ' '),
        es: input.name.es.trim().replace(/\s+/, ' '),
      },
    });

    return this.productModel.findOne({ _id }).populate('category');
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

    return this.productModel.findOne({ _id }).populate('category');
  }

  async deleteProduct(_id: string) {
    await this.productModel.deleteOne({ _id });
    return true;
  }
}
