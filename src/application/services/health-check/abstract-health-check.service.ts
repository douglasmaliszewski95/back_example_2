/**
 * @openapi
 * components:
 *  schemas:
 *   HealthCheckResponse:
 *    type: object
 *    properties:
 *      application:
 *        type: boolean
 *      prisma:
 *        type: boolean
 */
export interface HealthCheckResponse {
  application: boolean;
  prisma: boolean;
}

export abstract class AbstractHealthCheckService {
  abstract getHealthCheck(): Promise<HealthCheckResponse>;
}
