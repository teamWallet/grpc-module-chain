import { Controller, Get } from '@nestjs/common';
import {
  DNSHealthIndicator,
  HealthCheck,
  HealthCheckService,
  HealthIndicatorResult /*TypeOrmHealthIndicator*/,
} from '@nestjs/terminus';
import { HealthCheckResult } from '@nestjs/terminus/dist/health-check';
import { DemoHealthIndicator } from './demo-health-indicator.service';
@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    /* private readonly db: TypeOrmHealthIndicator,*/ private readonly dns: DNSHealthIndicator,
    private readonly demo: DemoHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  public readiness(): Promise<HealthCheckResult> {
    return this.health.check([
      //   (): Promise<HealthIndicatorResult> =>
      //     this.db.pingCheck("database", {
      //       timeout: 10000
      //     }),
      (): Promise<HealthIndicatorResult> =>
        this.dns.pingCheck('google', 'https://google.com'),
    ]);
  }

  @Get('/demolive')
  @HealthCheck()
  public demoliveness(): Promise<HealthCheckResult> {
    return this.health.check([
      (): Promise<HealthIndicatorResult> =>
        this.demo.isHealthy('utu-module-chain'),
    ]);
  }
}
