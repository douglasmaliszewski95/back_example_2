import { HealthCheckService } from '@application/services/health-check/health-check.service';
import HealthCheckServiceFactory from '../../../../../src/infra/factories/services/health-check.service.factory';
import { AbstractHealthCheckService } from '@application/services/health-check/abstract-health-check.service';

describe('Health check service factory test', () => {
  let sutService: AbstractHealthCheckService;

  beforeAll(async () => {
    sutService = await HealthCheckServiceFactory.make();
  });

  it('should return instance of HealthCheckService', () => {
    expect(sutService).toBeInstanceOf(HealthCheckService);
  });

  test('property healthCheckServiceFactory should be defined if its already instanced before', async () => {
    expect(HealthCheckServiceFactory['healthCheckServiceFactory']).toBeDefined();
    sutService = await HealthCheckServiceFactory.make();
    expect(sutService).toBeInstanceOf(HealthCheckService);
  });
});
