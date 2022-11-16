import { Module } from '@nestjs/common';
import { InvestmentsService } from './investments.service';
import { InvestmentsResolver } from './investments.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Investment, InvestmentSchema } from './schemas/investment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Investment.name, schema: InvestmentSchema }]),
  ],
  providers: [InvestmentsResolver, InvestmentsService],
})
export class InvestmentsModule {}
