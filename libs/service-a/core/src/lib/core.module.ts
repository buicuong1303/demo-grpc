import { Module } from '@nestjs/common';
import { HealthModule } from '@demo-grpc/service-a/health'
@Module({
  imports: [HealthModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class CoreModule {}
