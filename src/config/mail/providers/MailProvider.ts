import { IParseMailTemplate } from '../HandlebarsMailTemplate';

export interface IMailContact {
  name: string;
  email: string;
}

export interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

export abstract class MailProvider {
  abstract sendMail({ to, from, subject, templateData }: ISendMail): Promise<void>;
}
