import { RequestHandler } from 'express';
import { OK } from 'http-status';

import { AbstractHealthCheckService } from '@application/services/health-check/abstract-health-check.service';

export default class HealthCheckController {
  constructor(private healthCheckService: AbstractHealthCheckService) {}

  /**
   * @openapi
   * /health-check:
   *   get:
   *     tags:
   *       - HealthCheck
   *     summary: Check if the API is running
   *     responses:
   *       200:
   *         description: OK
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/HealthCheckResponse'
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
  public execute: RequestHandler = async (_request, response) => {
    const healthCheck = await this.healthCheckService.getHealthCheck();
    return response.status(OK).json(healthCheck);
  };
}
