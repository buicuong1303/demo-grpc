import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.cotroller';


@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
})
export class HealthModule {}