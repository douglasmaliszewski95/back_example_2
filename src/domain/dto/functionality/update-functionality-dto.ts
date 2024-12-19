/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateFunctionalityDTO:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         system:
 *           type: string
 *       required:
 *         - functionalityId
 *         - name
 *         - system
 */
export class UpdateFunctionalityDTO {
  constructor(
    public readonly functionalityId: string,
    public readonly name: string,
    public readonly system: string,
  ) {}
}
