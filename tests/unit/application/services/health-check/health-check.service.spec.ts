import { HealthCheckResponse } from '@application/services/health-check/abstract-health-check.service';
import { HealthCheckService } from '../../../../../src/application/services/health-check/health-check.service';

describe('HealthCheckService unit tests', () => {
  let service: HealthCheckService;
  let expectOutputHealthCheck: any;
  let mockHealthCheckRepoisitory: {
    getHealthCheck(): Promise<HealthCheckResponse>;
  };

  beforeEach(async () => {
    service = new HealthCheckService();
    expectOutputHealthCheck = {
      application: true,
      prisma: true,
    };
    mockHealthCheckRepoisitory = {
      getHealthCheck: jest.fn().mockReturnValue(Promise.resolve(expectOutputHealthCheck)),
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return application and prisma', async () => {
    service.getHealthCheck = mockHealthCheckRepoisitory.getHealthCheck;

    await expect(service.getHealthCheck()).resolves.toStrictEqual(expectOutputHealthCheck);
    expect(mockHealthCheckRepoisitory.getHealthCheck).toHaveBeenCalled();
  });
});
