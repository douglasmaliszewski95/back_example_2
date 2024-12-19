import { TextractRequestDTO, TextractResponseDTO } from '@domain/dto/textract/textract-dto';

export abstract class AbstractTextractService {
  abstract extract({ file, fileName }: TextractRequestDTO): Promise<TextractResponseDTO>;
}
