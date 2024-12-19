import HealthCheckController from '@application/v1/controllers/health-check/health-check.controller';
import HealthCheckServiceFactory from '@infra/factories/services/health-check.service.factory';
import HealthCheckControllerFactory from '@infra/factories/controllers/health-check.controller.factory';
import { AbstractHealthCheckService } from '@application/services/health-check/abstract-health-check.service';

describe('health check controller factory test', () => {
  let sutController: HealthCheckController;
  let healthCheckService: AbstractHealthCheckService;

  beforeAll(async () => {
    healthCheckService = await HealthCheckServiceFactory.make();
    sutController = await HealthCheckControllerFactory.make(healthCheckService);
  });

  it('should return instance of HealthCheckController', async () => {
    expect(sutController).toBeInstanceOf(HealthCheckController);
  });

  it('property healthCheckControllerFactory should be defined if its already instanced before', async () => {
    expect(HealthCheckControllerFactory['healthCheckControllerFactory']).toBeDefined();
    sutController = await HealthCheckControllerFactory.make(healthCheckService);
    expect(sutController).toBeInstanceOf(HealthCheckController);
  });
});
