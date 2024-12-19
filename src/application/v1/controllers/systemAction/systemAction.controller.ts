import { RequestHandler } from 'express';
import { NO_CONTENT, OK } from 'http-status';
import { AbstractSystemActionService } from '@application/services/systemAction/abstract-systemAction.service';
import { CreateSystemActionDTO } from '@domain/dto/systemAction/create-systemAction-dto';
import { UpdateSystemActionDTO } from '@domain/dto/systemAction/update-systemAction-dto';

export default class SystemActionController {
  constructor(private systemActionService: AbstractSystemActionService) {}

  /**
   * @openapi
   * /systemActions:
   *   get:
   *     tags:
   *       - SystemActions
   *     summary: Get a list of system actions
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
   *                     $ref: '#/components/schemas/SystemAction'
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
    const systemActions = await this.systemActionService.list(page, pageSize);
    return response.status(OK).json(systemActions);
  };

  /**
   * @openapi
   * /systemActions/{systemActionId}:
   *   get:
   *     tags:
   *       - SystemActions
   *     summary: Get a system action by id
   *     parameters:
   *       - in: path
   *         name: systemActionId
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
   *               $ref: '#/components/schemas/State'
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
  public listById: RequestHandler = async (request, response) => {
    const { systemActionId } = request.params;
    const systemAction = await this.systemActionService.listById(systemActionId);
    return response.status(OK).json(systemAction);
  };

  /**
   * @openapi
   * /systemActions:
   *   post:
   *     tags:
   *       - SystemActions
   *     summary: Create a system action
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateSystemActionDTO'
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/SystemAction'
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
  public createSystemAction: RequestHandler = async (request, response) => {
    const systemActionDTO: CreateSystemActionDTO = request.body;
    const createdSystemAction = await this.systemActionService.createSystemAction(systemActionDTO);
    return response.status(OK).json(createdSystemAction);
  };

  /**
   * @openapi
   * /systemActions/{systemActionId}:
   *   put:
   *     tags:
   *       - SystemActions
   *     summary: Update a system action
   *     parameters:
   *       - in: path
   *         name: systemActionId
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateSystemActionDTO'
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/SystemAction'
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
  public updateSystemAction: RequestHandler = async (request, response) => {
    const systemActionDTO: UpdateSystemActionDTO = request.body;
    const { systemActionId } = request.params;
    const updatedSystemAction = await this.systemActionService.updateSystemAction(systemActionId, systemActionDTO);
    return response.status(OK).json(updatedSystemAction);
  };

  /**
   * @openapi
   * /systemActions/{systemActionId}:
   *   delete:
   *     tags:
   *       - SystemActions
   *     summary: Delete a system action
   *     parameters:
   *       - in: path
   *         name: systemActionId
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
  public delete: RequestHandler = async (request, response) => {
    const { systemActionId } = request.params;
    await this.systemActionService.delete(systemActionId);
    return response.status(NO_CONTENT).json();
  };
}
