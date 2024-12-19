import { AbstractTextractService } from './abstract-aws-textract.service';
import { TextExtractor, DocumentAnalyzer, searchRules, searchKey } from '@application/utils/aws-textract';
import { awsConfig, awsS3Config } from '@config/aws-config';
import { S3Uploader } from '@application/utils/aws-s3-upload';
import { ValidationsRepository } from '@domain/repositories/validations-repository';
import { TextractStatus, TextractResponseDTO, TextractRequestDTO } from '@domain/dto/textract/textract-dto';
import AppError from '@domain/exceptions/AppError';
import { UNPROCESSABLE_ENTITY } from 'http-status';

export class TextractService implements AbstractTextractService {
  constructor(private validationsRepository: ValidationsRepository) {}

  async extract({ file, fileName }: TextractRequestDTO): Promise<TextractResponseDTO> {
    const textExtractor = new TextExtractor(awsConfig);
    const s3Uploader = new S3Uploader(awsS3Config);

    const documentAnalyzer = new DocumentAnalyzer(textExtractor);

    const s3result = await s3Uploader.uploadFile(file, fileName, process.env.AWS_S3_BUCKET_NAME as string);

    const listRules = await this.validationsRepository.findAll();

    const array: any = [];
    return new Promise((resolve, reject) => {
      documentAnalyzer
        .analyzeDocument(file)
        .then((result) => {
          if (result) {
            const { extractText }: any = result.values;

            if (!extractText) {
              s3Uploader.deleteFile(fileName, process.env.AWS_S3_BUCKET_NAME as string);
              reject(new AppError('Image text not extracted', UNPROCESSABLE_ENTITY));
              return;
            }

            const { text }: any = result;

            array.push(text);

            if (array.length === 0) {
              s3Uploader.deleteFile(fileName, process.env.AWS_S3_BUCKET_NAME as string);
              reject(new AppError('Image text not extracted', UNPROCESSABLE_ENTITY));
              return;
            }

            const wordsFound = searchRules(extractText.toUpperCase(), listRules);

            const findTotal = searchKey(array, [
              'VALOR TOTAL R$',
              'VALOR TOTAL',
              'VALOR TOTAL:',
              'TOTAL',
              'TOTAL:',
              'Valor total R$',
              'TOTAL R$',
              'Total',
              'Valor',
              'VALOR',
              'Valor a Pagar R$',
              'VALOR A PAGAR R$',
              'VALOR A PAGAR',
              'Valor a Pagar',
              'Valor total RS',
              'Valor do Serviço',
              'Valor Líquido da NFS-e',
              'SUBTOTAL',
              'Subtotal',
              'Class:',
              'Class',
              'Estadia:',
              'Recebido',
              'Recebido..:',
              'Total.....:',
              'Valor:R$',
              'VALOR:',
              'SUB TOTAL:',
              'R$',
              'VALOR PAGO',
              'CLASS:01',
              'Valor:',
              'ROTATIVO',
              'Valor a Pagar RS',
              'Valor Total:',
            ]);

            const findPriceAdditional = searchKey(array, ['Acréscimo total']);
            const findCar = searchKey(array, [
              'Placa',
              'Placa:',
              'PLACA',
              'PLACA:',
              'Placa Veículo',
              'Placa Veículo:',
              'Placa do Veiculo:',
              'ACA.....',
              'Placa do veículo:',
              'Veiculo:',
              'PLACA....:',
            ]);

            const findData = searchKey(array, [
              'Data de Autorização',
              'Data da Autorizacao:',
              'Data',
              'Data de Emissão',
              'EMISSÃO:',
              'EMISSÃO',
              'Data e Hora da emissão da DPS',
              'Competência da NFS-e',
              'Data de Autorizacao:',
              'Entrada',
              'Entrada :',
              'Entrada:',
              'Entrada....',
              'Entrada....:',
              'Horario de Entrada',
              'Anda',
              'Titrada',
              'Saida permitida ate:',
              'Saida Ate.',
              'Entrada..',
              'Horari de Entrada',
              'Data:',
              'DATA.....:',
              'Horario de Entrada...',
              'Data de autorizacao:',
              'Data de Autorizacao',
              'Emissão:',
            ]);

            const data = {
              data: array,
              text: extractText,
              car_plate: findCar,
              additional_price: findPriceAdditional,
              total_value: findTotal,
              date_value: findData,
              words_found: wordsFound,
              qtd_words_found: wordsFound.length,
              status:
                wordsFound.length > 0 || findTotal.length === 0 || findData.length === 0
                  ? TextractStatus.NON_CONFORMING
                  : TextractStatus.CONFORMING,
              validation_id: '4fa40e3d-cddd-4a86-938e-4ecc1bc5bd4b',
              file_url: s3result.Location,
            };

            resolve(data);
          } else {
            reject(new AppError('Textract Error', UNPROCESSABLE_ENTITY));
          }
        })
        .catch((err) => {
          reject(new AppError(err.message, 400));
        });
    });
  }
}
