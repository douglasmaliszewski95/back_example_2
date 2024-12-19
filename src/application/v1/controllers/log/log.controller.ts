import { RequestHandler } from 'express';
import { OK } from 'http-status';
import { AbstractLogService } from '@application/services/log/abstract-log.service';

export default class LogController {
  constructor(private logService: AbstractLogService) {}

  /**
   * @openapi
   * /log:
   *   get:
   *     tags:
   *       - Logs
   *     summary: Get a list of logs
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
   *                     $ref: '#/components/schemas/Log'
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
    const logs = await this.logService.list(page, pageSize);
    return response.status(OK).json(logs);
  };
}
