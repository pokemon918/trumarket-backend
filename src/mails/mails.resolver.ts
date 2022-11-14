import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Public } from 'src/auth/decorators/public.decorator';
import { ContactMailInput } from './dto/contact-mail.input';
import { MailsService } from './mails.service';

@Resolver()
export class MailsResolver {
  constructor(private mailsService: MailsService) {}

  @Mutation(() => Boolean)
  @Public()
  sendContactMail(@Args('input') input: ContactMailInput) {
    return this.mailsService.sendContactMail(input);
  }
}
