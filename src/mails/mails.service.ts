import { Injectable } from '@nestjs/common';
import sendMail from 'src/utils/sendMail';
import { ContactMailInput } from './dto/contact-mail.input';

const { CONTACT_RECEIVER_MAIL } = process.env as { [k: string]: string };

@Injectable()
export class MailsService {
  async sendContactMail({ subject, content, replyTo }: ContactMailInput) {
    await sendMail({
      subject,
      text: content,
      to: CONTACT_RECEIVER_MAIL,
      replyTo,
    });

    return true;
  }
}
