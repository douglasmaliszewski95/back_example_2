/**
 * @openapi
 * components:
 *   schemas:
 *     UpdatePositionDTO:
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
export class UpdatePositionDTO {
  constructor(
    public readonly positionId: string,
    public readonly name: string,
    public readonly regionOperationId: string,
  ) {}
}
