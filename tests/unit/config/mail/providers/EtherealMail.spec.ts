import EtherealMail from '@config/mail/providers/EtherealMail';
import nodemailer, { TestAccount } from 'nodemailer';
// import HandlebarsMailTemplate from './HandlebarsMailTemplate';

jest.mock('nodemailer', () => ({
  createTransport: jest.fn(),
  createTestAccount: jest.fn(),
  getTestMessageUrl: jest.fn(),
}));

describe('EtherealMail', () => {
  let etherealMail: EtherealMail;

  beforeEach(async () => {
    (nodemailer.createTransport as jest.Mock).mockReturnValue({
      sendMail: jest.fn().mockResolvedValue({
        messageId: 'mockedMessageId',
      }),
    });

    (nodemailer.createTestAccount as jest.Mock).mockResolvedValue({
      user: 'mockedUser',
      pass: 'mockedPass',
      smtp: {
        host: 'mockedHost',
        port: 123,
        secure: false,
      },
    } as TestAccount);

    etherealMail = new EtherealMail();
  });

  it('must create an EtherealMail object', () => {
    expect(etherealMail).toBeInstanceOf(EtherealMail);
  });

  it('must send an email', async () => {
    const mockedSendMail = nodemailer.createTransport().sendMail as jest.Mock;

    const templateData = {
      file: 'tests/utils/template-teste.hbs',
      variables: {
        name: 'Teste',
      },
    };

    const mailData = {
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
    };

    await expect(etherealMail.sendMail(mailData)).resolves.toBeUndefined();

    // Verify if the method sendMail was called with correct parameters
    expect(mockedSendMail).toHaveBeenCalledTimes(1);

    const [sentMailParams] = mockedSendMail.mock.calls[0];

    expect(sentMailParams).toMatchObject({
      to: {
        name: 'Recipient Name',
        address: 'recipient@example.com',
      },
      from: {
        name: 'Sender Name',
        address: 'sender@example.com',
      },
      subject: 'Test Email',
      html: expect.any(String),
    });
  });
});
