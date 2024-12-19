import { Request } from 'express';
import { OK } from 'http-status';

import HealthCheckServiceFactory from '@infra/factories/services/health-check.service.factory';
import HealthCheckControllerFactory from '@infra/factories/controllers/health-check.controller.factory';
import HealthCheckController from '@application/v1/controllers/health-check/health-check.controller';

describe('HealthCheckController', () => {
  afterAll(async () => {
    jest.clearAllMocks();
  });

  it('should execute request #unit', async () => {
    const healthCheckService = await HealthCheckServiceFactory.make();
    const sut: HealthCheckController = await HealthCheckControllerFactory.make(healthCheckService);

    healthCheckService.getHealthCheck = jest.fn().mockImplementation(() => ({
      application: true,
      prisma: true,
    }));

    const next = jest.fn();
    const req = {} as Request;
    const mockJsonResponse = jest.fn();
    const res: any = {
      status: jest.fn().mockImplementation(() => ({
        json: mockJsonResponse,
      })),
    };

    await sut.execute(req, res, next);

    expect(res.status).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(OK);
    expect(mockJsonResponse).toHaveBeenCalled();
  });
});
