import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { DemoHealthIndicator } from './demo-health-indicator.service';
import { HealthController } from './health.controller';
@Module({
  controllers: [HealthController],
  imports: [TerminusModule],
  providers: [DemoHealthIndicator],
})
export class HealthModule {}
