// eslint-disable-next-line max-len
import { AbstractRegionOperationService } from '@application/services/region-operation/abstract-region-operation.service';
import { RequestHandler } from 'express';
import { OK } from 'http-status';

export default class RegionOperationController {
  constructor(private regionOperationService: AbstractRegionOperationService) {}

  /**
   * @openapi
   * /region-operation:
   *   get:
   *     tags:
   *       - RegionOperation
   *     summary: Get a list of region operations
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
   *                     $ref: '#/components/schemas/RegionOperation'
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
    const regionOperations = await this.regionOperationService.list(page, pageSize);
    return response.status(OK).json(regionOperations);
  };
}
