import { randomUUID } from 'crypto';

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateFunctionalityDTO:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         system:
 *           type: string
 *       required:
 *         - name
 *         - system
 */
export class CreateFunctionalityDTO {
  public readonly functionalityId!: string;
  constructor(
    public readonly name: string,
    public readonly system: string,
  ) {
    this.functionalityId = randomUUID();
  }
}
