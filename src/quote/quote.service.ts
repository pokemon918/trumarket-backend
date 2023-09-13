/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
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
        //private twilioClient: Twilio
    ) {
    // this.twilioClient = new Twilio(
    //   process.env.TWILIO_ACCOUNT_SID,
    //   process.env.TWILIO_AUTH_TOKEN,
    // );
}

    // async sendRFQMessage(supplier: any, rfq: Quote) {
    //     const message = `
    //         👋 Hello ${supplier.name},
    //         We hope you're doing well!
    //         📢 We have a new Request for Quote (RFQ) that matches your product offerings.
    //         🍇 Product: ${rfq.product}
    //         📦 Volume: ${rfq.phone}
    //         💲 Expected Price Range: ${rfq.volume}
    //         📅 Delivery By: ${rfq.portOfLoading}
    //         📍 Location: ${rfq.portOfArrival}
    //         Would you be interested in this opportunity?`;

    //     const response = await this.httpService
    //       .post('https://api.whatsapp.com/send', { message, recipient: supplier.phone })
    //       .toPromise();
    //     if (response==='Yes') {
    //         const { _id } = rfq;
    //         await this.quoteModel.updateOne({_id }, { status: 'Approved' });
    //     }
    //     if (response==='No') {
    //         const { _id } = rfq;
    //         await this.quoteModel.updateOne({_id }, { status: 'Rejected' });
    //     }
    // }

    getQuotes(
      productId?: string,
    ) {
      const conditions: FilterQuery<QuoteDocument> = {};
  
      if (productId) {
        conditions.productId = productId;
      }
  
      return this.quoteModel
        .find(conditions);
    }

    async createQuote(input: CreateQuoteInput) {

      const suppliers = await this.companyModel.find({
        productIds: { $in: [input.productId] }
      });
      
      let rfqStatus: { id: any; name: string, phone: any, email: any, smsStatus: string }[] = [];
      suppliers.map((supplier: any) => {
        rfqStatus.push({ id: supplier._id, name: supplier.name, phone: supplier.phone, email: supplier.email, smsStatus: "pending" });
      });
      
      const rfq = await this.quoteModel.create({
        ...input,
        rfqStatus: { data: rfqStatus }
      });
      

       

       // await this.sendRFQMessage(supplier, rfq);

        return this.quoteModel.findOne({ _id: rfq._id });
    }
}
