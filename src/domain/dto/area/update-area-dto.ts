/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateAreaDTO:
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
export class UpdateAreaDTO {
  constructor(
    public readonly areaId: string,
    public readonly name: string,
    public readonly regionOperationId: string,
  ) {}
}
