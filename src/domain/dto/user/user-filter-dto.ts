/**
 * @openapi
 * components:
 *   schemas:
 *     UserFilterDTO:
 *       type: object
 *       properties:
 *         agency:
 *           type: array
 *           items:
 *             type: string
 *             format: uuid
 *         position:
 *           type: array
 *           items:
 *             type: string
 *             format: uuid
 *         area:
 *           type: array
 *           items:
 *             type: string
 *             format: uuid
 *         profile:
 *           type: array
 *           items:
 *             type: string
 *             format: uuid
 *         employee:
 *           type: string
 *         nationalId:
 *           type: string
 *         registrationId:
 *           type: string
 *         active:
 *           type: string
 *           enum: [all, true, false]
 *         sortDir:
 *           type: string
 *           enum: [asc, desc]
 */
export type UserFilterDto = {
  agency: string[];
  position: string[];
  area: string[];
  profile: string[];
  employee: string;
  nationalId: string;
  registrationId: number;
  active: 'all' | 'true' | 'false';
  sortDir: 'asc' | 'desc';
};
