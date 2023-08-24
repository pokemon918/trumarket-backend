import { CompaniesModule } from './companies/companies.module';
import { ContractsModule } from "./contracts/contracts.module";
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AuthMiddleware } from './auth/middlewares/auth.middleware';
import { FilesModule } from './files/files.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { ArticlesModule } from './articles/articles.module';
import { KeywordsModule } from './keywords/keywords.module';
import { MailsModule } from './mails/mails.module';
import { InvestmentsModule } from './investments/investments.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const { MONGO_URI, NODE_ENV, CORS } = process.env as { [k: string]: string };

@Module({
  imports: [
    CompaniesModule,
    ContractsModule,
    AuthModule,
    UsersModule,
    MongooseModule.forRoot(MONGO_URI),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
      playground: NODE_ENV === 'development',
      introspection: NODE_ENV === 'development',
      cors: {
        origin: CORS,
      },
      persistedQueries: false,
    }),
    FilesModule,
    ProductsModule,
    InvestmentsModule,
    CategoriesModule,
    ArticlesModule,
    KeywordsModule,
    MailsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
