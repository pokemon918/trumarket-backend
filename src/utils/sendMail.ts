import * as sgMail from '@sendgrid/mail';

const { SENDGRID_API_KEY, SENDER_MAIL } = process.env as { [k: string]: any };

sgMail.setApiKey(SENDGRID_API_KEY);

interface Mail {
  subject: string;
  html: string;
  to: string;
  replyTo?: string;
}

const sendMail = ({ subject, html, to, replyTo }: Mail) =>
  sgMail.send({
    from: {
      name: 'TRU Market',
      email: SENDER_MAIL,
    },
    to,
    subject,
    html,
    replyTo,
  });

export default sendMail;
