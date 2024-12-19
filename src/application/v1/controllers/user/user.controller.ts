import { RequestHandler } from 'express';
import { CREATED, NO_CONTENT, OK } from 'http-status';
import { AbstractUserService } from '@application/services/user/abstract-user.service';
import { CreateUserDTO } from '@domain/dto/user/create-user-dto';
import { UpdateUserDTO } from '@domain/dto/user/update-user-dto';
import { UserFilterDto } from '@domain/dto/user/user-filter-dto';

export default class UserController {
  constructor(private userService: AbstractUserService) {}

  /**
   * @openapi
   * /users/list:
   *   post:
   *     tags:
   *       - Users
   *     summary: Get a list of users
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: number
   *           default: 1
   *       - in: query
   *         name: pageSize
   *         schema:
   *           type: number
   *           default: 15
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/UserFilterDTO'
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/User'
   *                 totalItems:
   *                   type: number
   *                   default: 1
   *                 totalPages:
   *                   type: number
   *                   default: 1
   *                 currentPage:
   *                   type: number
   *                   default: 1
   *                 pageSize:
   *                   type: number
   *                   default: 15
   *                 maxLimit:
   *                   type: number
   *                   default: 50
   *       404:
   *         description: Not Found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/NotFoundResponse'
   *       422:
   *         description: Unprocessable Entity
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       500:
   *         description: Internal Server Error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  public list: RequestHandler = async (request, response) => {
    const page: number = parseInt(request.query.page as string);
    const pageSize: number = parseInt(request.query.pageSize as string);

    const filterDto: UserFilterDto = request.body;

    const users = await this.userService.list(page, pageSize, filterDto);
    return response.status(OK).json(users);
  };

  /**
   * @openapi
   * /users/search:
   *   post:
   *     tags:
   *       - Users
   *     summary: Search for users
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: number
   *           default: 1
   *       - in: query
   *         name: pageSize
   *         schema:
   *           type: number
   *           default: 15
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               search:
   *                 type: string
   *                 required: true
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/User'
   *                 totalItems:
   *                   type: number
   *                   default: 1
   *                 totalPages:
   *                   type: number
   *                   default: 1
   *                 currentPage:
   *                   type: number
   *                   default: 1
   *                 pageSize:
   *                   type: number
   *                   default: 15
   *                 maxLimit:
   *                   type: number
   *                   default: 50
   *       404:
   *         description: Not Found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/NotFoundResponse'
   *       422:
   *         description: Unprocessable Entity
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       500:
   *         description: Internal Server Error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  public search: RequestHandler = async (request, response) => {
    const page: number = parseInt(request.query.page as string);
    const pageSize: number = parseInt(request.query.pageSize as string);
    const { search } = request.body;
    const users = await this.userService.search({ page, pageSize, search });
    return response.status(OK).json(users);
  };

  /**
   * @openapi
   * /users/auto-complete:
   *   post:
   *     tags:
   *       - Users
   *     summary: Autocomplete users
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: number
   *           default: 1
   *       - in: query
   *         name: pageSize
   *         schema:
   *           type: number
   *           default: 15
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               search:
   *                 type: string
   *                 required: true
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/AutoCompleteOutputDTO'
   *                 totalItems:
   *                   type: number
   *                   default: 1
   *                 totalPages:
   *                   type: number
   *                   default: 1
   *                 currentPage:
   *                   type: number
   *                   default: 1
   *                 pageSize:
   *                   type: number
   *                   default: 15
   *                 maxLimit:
   *                   type: number
   *                   default: 50
   *       404:
   *         description: Not Found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/NotFoundResponse'
   *       422:
   *         description: Unprocessable Entity
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       500:
   *         description: Internal Server Error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  public autocomplete: RequestHandler = async (request, response) => {
    const { search } = request.body;
    const page: number = parseInt(request.query.page as string);
    const pageSize: number = parseInt(request.query.pageSize as string);
    const users = await this.userService.autocomplete(search, page, pageSize);
    return response.status(OK).json(users);
  };

  /**
   * @openapi
   * /users/{userId}:
   *   get:
   *     tags:
   *       - Users
   *     summary: Get a user by id
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       404:
   *         description: Not Found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/NotFoundResponse'
   *       422:
   *         description: Unprocessable Entity
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       500:
   *         description: Internal Server Error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  public show: RequestHandler = async (request, response) => {
    const { userId } = request.params;
    const user = await this.userService.show(userId);
    return response.status(OK).json(user);
  };

  /**
   * @openapi
   * /users:
   *   post:
   *     tags:
   *       - Users
   *     summary: Create a user
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateUserDTO'
   *     responses:
   *       201:
   *         description: Created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       404:
   *         description: Not Found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/NotFoundResponse'
   *       422:
   *         description: Unprocessable Entity
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       500:
   *         description: Internal Server Error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  public createUser: RequestHandler = async (request, response) => {
    const userDTO: CreateUserDTO = request.body;
    const createdUser = await this.userService.createUser(userDTO);
    return response.status(CREATED).json(createdUser);
  };

  /**
   * @openapi
   * /users/{userId}:
   *   put:
   *     tags:
   *       - Users
   *     summary: Update a user
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateUserDTO'
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       404:
   *         description: Not Found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/NotFoundResponse'
   *       422:
   *         description: Unprocessable Entity
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       500:
   *         description: Internal Server Error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  public updateUser: RequestHandler = async (request, response) => {
    const userDTO: UpdateUserDTO = request.body;
    const { userId } = request.params;
    const createdUser = await this.userService.updateUser(userId, userDTO);
    return response.status(OK).json(createdUser);
  };

  public enableDisable: RequestHandler = async (request, response) => {
    const { userId } = request.params;
    await this.userService.enableDisable(userId);
    return response.status(NO_CONTENT).json();
  };

  /**
   * @openapi
   * /users/{userId}:
   *   delete:
   *     tags:
   *       - Users
   *     summary: Delete a user
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *     responses:
   *       204:
   *         description: No Content
   *       404:
   *         description: Not Found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/NotFoundResponse'
   *       422:
   *         description: Unprocessable Entity
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       500:
   *         description: Internal Server Error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */

  /**
   * @openapi
   * /users/auth:
   *   post:
   *     tags:
   *       - Users
   *     summary: Authenticate a user
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateSessionRequestDTO'
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/CreateSessionResponseDTO'
   *       401:
   *         description: Unauthorized
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       404:
   *         description: Not Found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/NotFoundResponse'
   *       422:
   *         description: Unprocessable Entity
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       500:
   *         description: Internal Server Error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  public createSession: RequestHandler = async (_request, response) => {
    const { login, password } = _request.body;
    const user = await this.userService.createSession({ login, password });
    return response.status(OK).json(user);
  };

  /**
   * @openapi
   * /users/forgot_password:
   *   post:
   *     tags:
   *       - Users
   *     summary: Send forgot password email
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/SendForgotPasswordEmailDTO'
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 link:
   *                   type: string
   *       404:
   *         description: Not Found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/NotFoundResponse'
   *       422:
   *         description: Unprocessable Entity
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       500:
   *         description: Internal Server Error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  public sendForgotPasswordEmail: RequestHandler = async (_request, response) => {
    const { email } = _request.body;
    const link = await this.userService.sendForgotPasswordEmail({ email });
    return response.status(OK).json({ link });
  };

  /**
   * @openapi
   * /users/reset_password:
   *   post:
   *     tags:
   *       - Users
   *     summary: Reset user password
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ResetPasswordDTO'
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   default: password reseted successfully
   *       404:
   *         description: Not Found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/NotFoundResponse'
   *       422:
   *         description: Unprocessable Entity
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       500:
   *         description: Internal Server Error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  public resetPassword: RequestHandler = async (_request, response) => {
    const { reset_token, new_password } = _request.body;
    await this.userService.resetPassword({ resetToken: reset_token, newPassword: new_password });
    return response.status(OK).json({ message: 'password reseted successfully' });
  };

  /**
   * @openapi
   * /users/update_password:
   *   patch:
   *     tags:
   *       - Users
   *     summary: Update user password
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdatePasswordDTO'
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   default: password updated successfully
   *       404:
   *         description: Not Found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/NotFoundResponse'
   *       422:
   *         description: Unprocessable Entity
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *       500:
   *         description: Internal Server Error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   */
  public updatePassword: RequestHandler = async (_request, response) => {
    const { userId, newPassword, password } = _request.body;
    await this.userService.updatePassword({ userId, newPassword, password });
    return response.status(OK).json({ message: 'password updated successfully' });
  };
}
