import { User } from '@domain/entities/User';

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateSessionRequestDTO:
 *       type: object
 *       properties:
 *         login:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *         - login
 *         - password
 */
export interface CreateSessionRequestDTO {
  login: string;
  password: string;
}

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateSessionResponseDTO:
 *       type: object
 *       properties:
 *         user:
 *           $ref: '#/components/schemas/User'
 *         token:
 *           type: string
 *       required:
 *         - user
 *         - token
 */
export interface CreateSessionResponseDTO {
  user: User;
  token: string;
}
