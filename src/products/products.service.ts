import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

  getProducts() {
    return this.productModel.find();
  }

  getProduct(_id: string) {
    return this.productModel.findOne({ _id });
  }

  createProduct(input: CreateProductInput) {
    return this.productModel.create(input);
  }

  async updateProduct({ _id, ...input }: UpdateProductInput) {
    const updated = removeNullishAttrs(input);

    await this.productModel.updateOne({ _id }, updated);

    return this.productModel.findOne({ _id });
  }

  async deleteProduct(_id: string) {
    await this.productModel.deleteOne({ _id });
    return true;
  }
}
