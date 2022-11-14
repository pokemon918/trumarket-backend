import * as sgMail from '@sendgrid/mail';

const { SENDGRID_API_KEY, SENDER_MAIL } = process.env as { [k: string]: any };

sgMail.setApiKey(SENDGRID_API_KEY);

interface Mail {
  subject: string;
  html?: string;
  text?: string;
  to: string;
  replyTo?: string;
}

const sendMail = ({ subject, html, text, to, replyTo }: Mail) => sgMail.send({
  from: {
    name: 'TRU Market',
    email: SENDER_MAIL,
  },
  to,
  subject,
  html,
  text: text as string,
  replyTo,
})

export default sendMail;
