import { ISendMail } from '@config/mail/providers/MailProvider';

export class MockMailProvider {
  async sendMail({ to, from, subject, templateData }: ISendMail): Promise<void> {
    // Implementação simulada do método sendMail
    console.log('Sending mock email...');
    console.log('To:', to);
    console.log('From:', from);
    console.log('Subject:', subject);
    console.log('TemplateData:', templateData);
  }
}
