// import { MailProvider, ISendMail } from '@config/mail/providers/MailProvider';
import { MockMailProvider } from '../../../../utils/mocks/MockMailProvider';

describe('MailProvider', () => {
  it('should send fake mail', async () => {
    const templateData = {
      file: 'tests/utils/template-teste.hbs',
      variables: {
        name: 'Teste',
      },
    };

    const mailProvider = new MockMailProvider();

    const sendMailSpy = jest.spyOn(mailProvider, 'sendMail');

    await mailProvider.sendMail({
      to: {
        name: 'Recipient Name',
        email: 'recipient@example.com',
      },
      from: {
        name: 'Sender Name',
        email: 'sender@example.com',
      },
      subject: 'Test Email',
      templateData,
    });

    expect(sendMailSpy).toHaveBeenCalledTimes(1);
  });
});
