import { RequestHandler } from 'express';
import { NO_CONTENT, OK } from 'http-status';
import { AbstractStateService } from '@application/services/state/abstract-state.service';
import { CreateStateDTO } from '@domain/dto/state/create-state-dto';
import { UpdateStateDTO } from '@domain/dto/state/update-state-dto';

export default class StateController {
  constructor(private stateService: AbstractStateService) {}

  /**
   * @openapi
   * /states:
   *   get:
   *     tags:
   *       - States
   *     summary: Get a list of states
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
   *                     $ref: '#/components/schemas/State'
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
    const states = await this.stateService.list(page, pageSize);
    return response.status(OK).json(states);
  };

  /**
   * @openapi
   * /states/{stateId}:
   *   get:
   *     tags:
   *       - States
   *     summary: Get a state by id
   *     parameters:
   *       - in: path
   *         name: stateId
   *         required: true
   *         schema:
   *           type: number
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
    const { stateId } = request.params;
    const state = await this.stateService.listById(parseInt(stateId));
    return response.status(OK).json(state);
  };

  /**
   * @openapi
   * /states:
   *   post:
   *     tags:
   *       - States
   *     summary: Create a state
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateStateDTO'
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
  public createState: RequestHandler = async (request, response) => {
    const stateDTO: CreateStateDTO = request.body;
    const createdState = await this.stateService.createState(stateDTO);
    return response.status(OK).json(createdState);
  };

  /**
   * @openapi
   * /states/{stateId}:
   *   put:
   *     tags:
   *       - States
   *     summary: Update a state
   *     parameters:
   *       - in: path
   *         name: stateId
   *         required: true
   *         schema:
   *           type: number
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateStateDTO'
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Area'
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
  public updateState: RequestHandler = async (request, response) => {
    const stateDTO: UpdateStateDTO = request.body;
    const { stateId } = request.params;
    const updatedState = await this.stateService.updateState(parseInt(stateId), stateDTO);
    return response.status(OK).json(updatedState);
  };

  /**
   * @openapi
   * /states/{stateId}:
   *   delete:
   *     tags:
   *       - States
   *     summary: Delete a state
   *     parameters:
   *       - in: path
   *         name: stateId
   *         required: true
   *         schema:
   *           type: number
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
    const { stateId } = request.params;
    await this.stateService.delete(parseInt(stateId));
    return response.status(NO_CONTENT).json();
  };
}
