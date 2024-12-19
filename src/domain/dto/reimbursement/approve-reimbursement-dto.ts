/**
 * @openapi
 * components:
 *   schemas:
 *     ApproveReimbursementDTO:
 *       type: object
 *       properties:
 *         reimbursementId:
 *           type: string
 *           format: uuid
 *         commentary:
 *           type: string
 */
export type ApproveReimbursementDto = {
  reimbursementId: string;
  commentary: string;
};
