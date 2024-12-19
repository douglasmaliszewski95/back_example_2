import HandlebarsMailTemplate from '@config/mail/HandlebarsMailTemplate';

describe('HandlebarsMailTemplate', () => {
  const templateInstance = new HandlebarsMailTemplate();

  it('Deve processar o template corretamente', async () => {
    const file = 'tests/utils/template-teste.hbs';
    const variables = { name: 'John', age: 30 };
    const expectedOutput = 'Olá John, você tem 30 anos!';

    const result = await templateInstance.parse({ file, variables });

    expect(result).toBe(expectedOutput);
  });

  it('Deve lançar um erro se o arquivo do template não existir', async () => {
    const file = 'caminho/inexistente/template.hbs';
    const variables = { name: 'John', age: 30 };

    await expect(templateInstance.parse({ file, variables })).rejects.toThrow();
  });
});
