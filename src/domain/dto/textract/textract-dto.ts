/**
 * @openapi
 * components:
 *   schemas:
 *     TextractRequestDTO:
 *       type: object
 *       properties:
 *         file:
 *           type: string
 *           format: binary
 */
export interface TextractRequestDTO {
  file: Buffer;
  fileName: string;
}

/**
 * @openapi
 * components:
 *   schemas:
 *     TextractStatus:
 *       type: string
 *       enum:
 *         - CONFORMING
 *         - NON_CONFORMING
 */
export enum TextractStatus {
  CONFORMING = 'CONFORMING',
  NON_CONFORMING = 'NON_CONFORMING',
}

/**
 * @openapi
 * components:
 *   schemas:
 *     TextractResponseDTO:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items: {}
 *         text:
 *           type: string
 *         car_plate:
 *           type: array
 *           items:
 *             type: string
 *         additional_price:
 *           type: array
 *           items:
 *             type: string
 *         total_value:
 *           type: array
 *           items:
 *             type: string
 *         date_value:
 *           type: array
 *           items:
 *             type: string
 *         words_found:
 *           type: array
 *           items:
 *             type: string
 *         qtd_words_found:
 *           type: number
 *         status:
 *           $ref: '#/components/schemas/TextractStatus'
 */
export interface TextractResponseDTO {
  data: any[];
  text: string;
  car_plate: string[];
  additional_price: string[];
  total_value: string[];
  date_value: string[];
  words_found: string[];
  qtd_words_found: number;
  status: TextractStatus;
}
