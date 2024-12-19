/**
 * @openapi
 * components:
 *   schemas:
 *     ProfileFunctionalitiesDTO:
 *       type: object
 *       properties:
 *         functionalityId:
 *           type: string
 *           format: uuid
 *         enable:
 *           type: boolean
 *         preview:
 *           type: boolean
 *         maintenance:
 *           type: boolean
 */
interface ProfileFunctionalitiesDto {
  functionalityId: string;
  enable: boolean;
  preview: boolean;
  maintenance: boolean;
}

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateProfileDTO:
 *       type: object
 *       properties:
 *         regionOperationId:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         profileFunctionalities:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProfileFunctionalitiesDTO'
 *       required:
 *         - regionOperationId
 *         - name
 *         - profileFunctionalities
 */
export class UpdateProfileDTO {
  constructor(
    public readonly profileId: string,
    public readonly regionOperationId: string,
    public readonly name: string,
    public readonly profileFunctionalities: ProfileFunctionalitiesDto[],
  ) {}
}
