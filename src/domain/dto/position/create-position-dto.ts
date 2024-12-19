import { randomUUID } from 'crypto';

/**
 * @openapi
 * components:
 *   schemas:
 *     CreatePositionDTO:
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
export class CreatePositionDTO {
  public readonly positionId!: string;
  constructor(
    public readonly name: string,
    public readonly regionOperationId: string,
  ) {
    this.positionId = randomUUID();
  }
}
