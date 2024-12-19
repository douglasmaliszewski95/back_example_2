import { AbstractHealthCheckService, HealthCheckResponse } from './abstract-health-check.service';

export class HealthCheckService implements AbstractHealthCheckService {
  constructor() {}

  async getHealthCheck(): Promise<HealthCheckResponse> {
    return {
      application: true,
      prisma: true,
    };
  }
}
