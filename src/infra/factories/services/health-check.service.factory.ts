import { AbstractHealthCheckService } from '@application/services/health-check/abstract-health-check.service';
import { HealthCheckService } from '@application/services/health-check/health-check.service';

export default class HealthCheckServiceFactory {
  private static healthCheckServiceFactory: AbstractHealthCheckService;

  static async make(): Promise<AbstractHealthCheckService> {
    if (this.healthCheckServiceFactory) {
      return this.healthCheckServiceFactory;
    }

    this.healthCheckServiceFactory = new HealthCheckService();
    return this.healthCheckServiceFactory;
  }
}
