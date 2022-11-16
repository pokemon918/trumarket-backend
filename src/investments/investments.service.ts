import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { LangSearchI } from 'src/global/dto/lang-search.input';
import removeNullishAttrs from 'src/utils/removeNullishAttrs';
import { CreateInvestmentInput } from './dto/create-investment.input';
import { UpdateInvestmentInput } from './dto/update-investment.input';
import { Investment, InvestmentDocument } from './schemas/investment.schema';

@Injectable()
export class InvestmentsService {
  constructor(
    @InjectModel(Investment.name)
    private investmentModel: Model<InvestmentDocument>,
  ) {}

  getInvestments(nameSearch?: LangSearchI, categoryId?: string) {
    const conditions: FilterQuery<InvestmentDocument> = {};

    if (nameSearch) {
      const value = nameSearch.value.trim().replace(/\s+/, ' ');

      conditions[`name.${nameSearch.lang}`] = new RegExp(value, 'i');
    }

    if (categoryId) {
      conditions.categoryId = categoryId;
    }

    return this.investmentModel.find(conditions).populate('category');
  }

  getInvestment(_id: string) {
    return this.investmentModel.findOne({ _id }).populate('category');
  }

  async createInvestment(input: CreateInvestmentInput) {
    const { _id } = await this.investmentModel.create({
      ...input,
      name: {
        en: input.name.en.trim().replace(/\s+/, ' '),
        es: input.name.es.trim().replace(/\s+/, ' '),
      },
    });

    return this.investmentModel.findOne({ _id }).populate('category');
  }

  async updateInvestment({ _id, ...input }: UpdateInvestmentInput) {
    const updated = removeNullishAttrs({
      ...input,
      name: input.name
        ? {
            en: input.name.en.trim().replace(/\s+/, ' '),
            es: input.name.es.trim().replace(/\s+/, ' '),
          }
        : undefined,
    });

    await this.investmentModel.updateOne({ _id }, updated);

    return this.investmentModel.findOne({ _id }).populate('category');
  }

  async deleteInvestment(_id: string) {
    await this.investmentModel.deleteOne({ _id });
    return true;
  }
}
