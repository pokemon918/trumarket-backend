/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuoteInput } from './dto/create-quote.input';
import { Quote, QuoteDocument } from './schemas/quote.schema';
import { Company, CompanyDocument } from '../companies/schemas/company.schema';
import { Twilio } from 'twilio';

@Injectable()
export class QuoteService {
constructor(
        @InjectModel(Quote.name)
        private quoteModel: Model<QuoteDocument>,
        @InjectModel(Company.name)
        private companyModel: Model<CompanyDocument>,
        private twilioClient: Twilio, 
        private httpService: Httpservice,
    ) {
    this.twilioClient = new Twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
    );
}

    async sendRFQMessage(supplier: Company, rfq: Quote) {
        const message = `
            👋 Hello ${supplier.name},
            We hope you're doing well!
            📢 We have a new Request for Quote (RFQ) that matches your product offerings.
            🍇 Product: ${rfq.product}
            📦 Volume: ${rfq.number}
            💲 Expected Price Range: ${rfq.volume}
            📅 Delivery By: ${rfq.portOfLoading}
            📍 Location: ${rfq.portOfArrival}
            Would you be interested in this opportunity?`;

        const response = await this.httpService
          .post('https://api.whatsapp.com/send', { message, recipient: supplier.phone })
          .toPromise();
        if (response==='Yes') {
            const { _id } = rfq;
            await this.quoteModel.updateOne({_id }, { status: 'Approved' });
        }
        if (response==='No') {
            const { _id } = rfq;
            await this.quoteModel.updateOne({_id }, { status: 'Rejected' });
        }
    }

    @Post()
    async createQuote(input: CreateQuoteInput) {
        const rfq = await this.quoteModel.create({
            ...input,
            status: 'Pending'
        });

        const supplier = await this.companyModel.findOne({
            companyType: 'Supplier',
            products: rfq.product
        });

        await this.sendRFQMessages(supplier, rfq);

        return this.quoteModel.findOne({ _id });
    }
}
