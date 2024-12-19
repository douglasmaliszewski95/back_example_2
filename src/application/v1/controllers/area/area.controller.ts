import { RequestHandler } from 'express';
import { NO_CONTENT, OK } from 'http-status';
import { AbstractAreaService } from '@application/services/area/abstract-area.service';
import { CreateAreaDTO } from '@domain/dto/area/create-area-dto';
import { UpdateAreaDTO } from '@domain/dto/area/update-area-dto';

export default class AreaController {
  constructor(private areaService: AbstractAreaService) {}

  /**
   * @openapi
   * /areas:
   *   get:
   *     tags:
   *       - Areas
   *     summary: Get a list of areas
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
   *                     $ref: '#/components/schemas/Area'
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
    const areas = await this.areaService.list(page, pageSize);
    return response.status(OK).json(areas);
  };

  /**
   * @openapi
   * /areas/{areaId}:
   *   get:
   *     tags:
   *       - Areas
   *     summary: Get a area by id
   *     parameters:
   *       - in: path
   *         name: areaId
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
  public findById: RequestHandler = async (request, response) => {
    const { areaId } = request.params;
    const area = await this.areaService.findById(areaId);
    return response.status(OK).json(area);
  };

  /**
   * @openapi
   * /areas:
   *   post:
   *     tags:
   *       - Areas
   *     summary: Create a area
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateAreaDTO'
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
  public createArea: RequestHandler = async (request, response) => {
    const areaDTO: CreateAreaDTO = request.body;
    const createdArea = await this.areaService.createArea(areaDTO);
    return response.status(OK).json(createdArea);
  };

  /**
   * @openapi
   * /areas/{areaId}:
   *   put:
   *     tags:
   *       - Areas
   *     summary: Update a area
   *     parameters:
   *       - in: path
   *         name: areaId
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateAreaDTO'
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
  public updateArea: RequestHandler = async (request, response) => {
    const areaDTO: UpdateAreaDTO = request.body;
    const { areaId } = request.params;
    const updatedArea = await this.areaService.updateArea(areaId, areaDTO);
    return response.status(OK).json(updatedArea);
  };

  /**
   * @openapi
   * /areas/{areaId}:
   *   delete:
   *     tags:
   *       - Areas
   *     summary: Delete a area
   *     parameters:
   *       - in: path
   *         name: areaId
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
    const { areaId } = request.params;
    await this.areaService.delete(areaId);
    return response.status(NO_CONTENT).json();
  };
}
