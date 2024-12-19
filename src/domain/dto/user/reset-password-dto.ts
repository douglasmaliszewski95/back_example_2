/**
 * @openapi
 * components:
 *   schemas:
 *     SendForgotPasswordEmailDTO:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *       required:
 *         - email
 */
export interface sendForgotPasswordEmail {
  email: string;
}

/**
 * @openapi
 * components:
 *   schemas:
 *     ResetPasswordDTO:
 *       type: object
 *       properties:
 *         reset_token:
 *           type: string
 *         new_password:
 *           type: string
 *           minLength: 8
 *       required:
 *         - resetToken
 *         - newPassword
 */
export interface ResetPasswordDTO {
  resetToken: string;
  newPassword: string;
}

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdatePasswordDTO:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *         newPassword:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *         - userId
 *         - newPassword
 *         - password
 */
export interface UpdatePasswordDTO {
  userId: string;
  newPassword: string;
  password: string;
}
