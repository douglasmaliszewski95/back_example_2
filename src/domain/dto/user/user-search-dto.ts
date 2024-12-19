/**
 * @openapi
 * components:
 *   schemas:
 *     UserSearchDTO:
 *       type: object
 *       properties:
 *         page:
 *           type: number
 *           default: 1
 *         pageSize:
 *           type: number
 *           default: 15
 *         search:
 *           type: string
 *       required:
 *         - page
 *         - pageSize
 *         - search
 */
export interface UserSearchDTO {
  page: number;
  pageSize: number;
  search: string;
}
