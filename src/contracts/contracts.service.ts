import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import {
  Product,
  ProductDocument,
} from 'src/products/schemas/product.schema';
import { FilesService } from 'src/files/files.service';
// import { LangSearchI } from 'src/global/dto/lang-search.input';
import removeNullishAttrs from 'src/utils/removeNullishAttrs';
import { CreateContractInput } from './dto/create-contract.input';
import { UpdateContractInput } from './dto/update-contract.input';
import { Contract, ContractDocument } from './schemas/contract.schema';

@Injectable()
export class ContractsService {
  constructor(
    @InjectModel(Contract.name)
    private contractModel: Model<ContractDocument>,
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
    private filesService: FilesService,
  ) {}

  getContracts(
    // nameSearch?: LangSearchI,
    productId?: string,
    descCreatedAt?: boolean,
    isExisting?: boolean,
  ) {
    const conditions: FilterQuery<ContractDocument> = {};

    // if (nameSearch) {
    //   const value = nameSearch.value.trim().replace(/\s+/, ' ');

    //   conditions[`name.${nameSearch.lang}`] = new RegExp(value, 'i');
    // }

    if (productId) {
      conditions.productId = productId;
    }

    if (isExisting) {
      conditions.isExisting = true;
    } else {
      conditions.isExisting = false;
    }

    return this.contractModel
      .find(conditions)
      .sort({ createdAt: descCreatedAt ? -1 : 1 });
  }

  getContract(_id: string) {
    return this.contractModel.findOne({ _id });
  }

  async createContract(input: CreateContractInput) {
    const { _id } = await this.contractModel.create({
      ...input,
      description: {
        en: input.description.en.trim().replace(/\s+/, ' '),
        es: input.description.es.trim().replace(/\s+/, ' '),
      },
    });

    return this.contractModel.findOne({ _id });
  }

  async updateContract({ _id, ...input }: UpdateContractInput) {
    const updated = removeNullishAttrs({
      ...input,
      description: input.description
        ? {
            en: input.description.en.trim().replace(/\s+/, ' '),
            es: input.description.es.trim().replace(/\s+/, ' '),
          }
        : undefined,
    });

    await this.contractModel.updateOne({ _id }, updated);

    return this.contractModel.findOne({ _id });
  }

  async deleteContractFiles(contract: Contract) {
    const fileUrls: string[] = [];

    if (contract.attachment) fileUrls.push(contract.attachment);

    const filenames = fileUrls.map(
      (fileUrl) => fileUrl.split('/').slice(-1)[0],
    );

    await this.filesService.deleteFiles(filenames);
  }

  async deleteContract(_id: string) {
    const contract = await this.contractModel.findOne({ _id });
    if (!contract) return true;

    await this.contractModel.deleteOne({ _id });
    await this.deleteContractFiles(contract);
    return true;
  }

  async getContractProduct(productId: string) {
    return this.productModel.findOne({ _id: productId });
  }
}
