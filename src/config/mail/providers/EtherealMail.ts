import nodemailer, { Transporter } from 'nodemailer';
import HandlebarsMailTemplate from '../HandlebarsMailTemplate';
import mailConfig from '@config/mail/mail';
import { ISendMail, MailProvider } from './MailProvider';

export default class EtherealMail extends MailProvider {
  protected transporter!: Transporter;

  private async initializeTransporter() {
    const account = await nodemailer.createTestAccount();
    return nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });
  }

  async sendMail({ to, from, subject, templateData }: ISendMail): Promise<void> {
    const transporter = await this.initializeTransporter();

    const mailTemplate = new HandlebarsMailTemplate();

    const { email, name } = mailConfig.defaults.from;

    const message = await transporter.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailTemplate.parse(templateData),
    });

    console.log('Message sent: %s' + message.messageId);
    console.log('Preview URL: %s' + nodemailer.getTestMessageUrl(message));
  }
}
