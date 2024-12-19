/**
 * @openapi
 * components:
 *   schemas:
 *     AutoCompleteOutputDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 */
export type AutoCompleteOutputDto = {
  id: string;
  name: string;
};
