import HealthCheckController from '@application/v1/controllers/health-check/health-check.controller';
import { AbstractHealthCheckService } from '@application/services/health-check/abstract-health-check.service';
import HealthCheckServiceFactory from '@infra/factories/services/health-check.service.factory';

export default class HealthCheckControllerFactory {
  private static healthCheckControllerFactory: HealthCheckController;
  static async make(healthCheckService?: AbstractHealthCheckService): Promise<HealthCheckController> {
    if (this.healthCheckControllerFactory) {
      return this.healthCheckControllerFactory;
    }

    this.healthCheckControllerFactory = new HealthCheckController(
      healthCheckService || (await HealthCheckServiceFactory.make()),
    );
    return this.healthCheckControllerFactory;
  }
}
