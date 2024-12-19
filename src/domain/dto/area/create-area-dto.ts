import { randomUUID } from 'crypto';

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateAreaDTO:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         regionOperationId:
 *           type: string
 *       required:
 *         - name
 *         - regionOperationId
 */
export class CreateAreaDTO {
  public readonly areaId!: string;
  constructor(
    public readonly name: string,
    public readonly regionOperationId: string,
  ) {
    this.areaId = randomUUID();
  }
}
