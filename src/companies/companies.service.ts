/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { LangSearchI } from 'src/global/dto/lang-search.input';
import removeNullishAttrs from 'src/utils/removeNullishAttrs';
import { CreateCompanyInput } from './dto/create-company.input';
import { UpdateCompanyInput } from './dto/update-company.input';
import { Company, CompanyDocument } from './schemas/company.schema';
import { Product, ProductDocument } from '../products/schemas/product.schema';

@Injectable()
export class CompaniesService {
constructor(
        @InjectModel(Company.name)
        private companyModel: Model<CompanyDocument>,
        @InjectModel(Product.name)
        private productModel: Model<ProductDocument>,
    ) {}

    getCompanies(
        nameSearch?: LangSearchI,
        productId?: string,
        descCreatedAt?: boolean,
        companyType?: string,
    ) {
    const conditions: FilterQuery<CompanyDocument> = {};

    if (nameSearch) {
        const value = nameSearch.value.trim().replace(/\s+/, ' ');

        conditions[`name.${nameSearch.lang}`] = new RegExp(value, 'i');
    }

    if (productId) {
        conditions.productId = productId;
    }

    if (companyType) {
        conditions.companyType = companyType
    }

    return this.companyModel
        .find(conditions)
        .sort({ createdAt: descCreatedAt ? -1 : 1 });
    }

    getCompany(_id: string) {
        return this.companyModel.findOne({ _id });
    }

    async createCompany(input: CreateCompanyInput) {
        const { _id } = await this.companyModel.create({
            ...input,
            name: {
                en: input.name.en.trim().replace(/\s+/, ' '),
                es: input.name.es.trim().replace(/\s+/, ' '),
            },
        });

        return this.companyModel.findOne({ _id });
    }

    async updateCompany({ _id, ...input }: UpdateCompanyInput) {
        const updated = removeNullishAttrs({
            ...input,
            name: input.name
            ? {
                en: input.name.en.trim().replace(/\s+/, ' '),
                es: input.name.es.trim().replace(/\s+/, ' '),
                }
            : undefined,
        });

        await this.companyModel.updateOne({ _id }, updated);

        return this.companyModel.findOne({ _id });
    }

    // async deleteCompanyFiles(company: Company) {

    // company.gallery.forEach((f) => fileUrls.push(f));
    // company.traces.forEach((t) => t.gallery.forEach((f) => fileUrls.push(f)));
    // company.certifications.forEach((f) => fileUrls.push(f));

    // const filenames = fileUrls.map(
    //     (fileUrl) => fileUrl.split('/').slice(-1)[0],
    // );

    // await this.filesService.deleteFiles(filenames);
    // }

    async deleteCompany(_id: string) {
        const company = await this.companyModel.findOne({ _id });
        if (!company) return true;

        await this.companyModel.deleteOne({ _id });
        // await this.deleteCompanyFiles(company);
        return true;
    }

    async getCompanyProduct(productId: string) {
        return this.productModel.findOne({ _id: productId });
    }
}
