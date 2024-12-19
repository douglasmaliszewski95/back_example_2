import { RequestHandler } from 'express';
import { OK } from 'http-status';
import { AbstractTextractService } from '@application/services/aws-textract/abstract-aws-textract.service';
// import { TextractRequestDTO } from '@domain/dto/textract/textract-dto';

export default class TextractController {
  constructor(private textractService: AbstractTextractService) {}

  /**
   * @openapi
   * /textract:
   *   post:
   *     tags:
   *       - TextExtract
   *     summary: Upload a file to extract text
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             $ref: '#/components/schemas/TextractRequestDTO'
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/TextractResponseDTO'
   *       404:
   *         description: Not Found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/NotFoundResponse'
   *       422:
   *         description: Unprocessable Entity
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       500:
   *         description: Internal Server Error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */

  public extract: RequestHandler = async (request, response) => {
    if (!request.file) {
      throw new Error('File not provided in the request.');
    }

    const file = request.file?.buffer;
    const fileName = request.file?.originalname;

    const text = await this.textractService.extract({ file, fileName });
    return response.status(OK).json(text);
  };
}
