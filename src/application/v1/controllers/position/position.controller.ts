import { RequestHandler } from 'express';
import { NO_CONTENT, OK } from 'http-status';
import { AbstractPositionService } from '@application/services/position/abstract-position.service';
import { CreatePositionDTO } from '@domain/dto/position/create-position-dto';
import { UpdatePositionDTO } from '@domain/dto/position/update-position-dto';

export default class PositionController {
  constructor(private positionService: AbstractPositionService) {}

  /**
   * @openapi
   * /positions:
   *   get:
   *     tags:
   *       - Positions
   *     summary: Get a list of positions
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
   *                     $ref: '#/components/schemas/Position'
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
    const positions = await this.positionService.list(page, pageSize);
    return response.status(OK).json(positions);
  };

  /**
   * @openapi
   * /positions/{positionId}:
   *   get:
   *     tags:
   *       - Positions
   *     summary: Get a position by id
   *     parameters:
   *       - in: path
   *         name: positionId
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
   *               $ref: '#/components/schemas/Position'
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
  public findById: RequestHandler = async (request, response) => {
    const { positionId } = request.params;
    const position = await this.positionService.findById(positionId);
    return response.status(OK).json(position);
  };

  /**
   * @openapi
   * /positions:
   *   post:
   *     tags:
   *       - Positions
   *     summary: Create a position
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreatePositionDTO'
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Position'
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
  public createPosition: RequestHandler = async (request, response) => {
    const positionDTO: CreatePositionDTO = request.body;
    const createdPosition = await this.positionService.createPosition(positionDTO);
    return response.status(OK).json(createdPosition);
  };

  /**
   * @openapi
   * /positions/{positionId}:
   *   put:
   *     tags:
   *       - Positions
   *     summary: Update a position
   *     parameters:
   *       - in: path
   *         name: positionId
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdatePositionDTO'
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Position'
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
  public updatePosition: RequestHandler = async (request, response) => {
    const positionDTO: UpdatePositionDTO = request.body;
    const { positionId } = request.params;
    const updatedPosition = await this.positionService.updatePosition(positionId, positionDTO);
    return response.status(OK).json(updatedPosition);
  };

  /**
   * @openapi
   * /positions/{positionId}:
   *   delete:
   *     tags:
   *       - Positions
   *     summary: Delete a position
   *     parameters:
   *       - in: path
   *         name: positionId
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
    const { positionId } = request.params;
    await this.positionService.delete(positionId);
    return response.status(NO_CONTENT).json();
  };
}
