import { Controller, Get } from '@nestjs/common';
import { GrpcOptions } from '@nestjs/microservices';
import { join } from 'path';
import {
  HealthCheckService,
  GRPCHealthIndicator,
} from '@nestjs/terminus';
const baseUrl = 'libs/shared/src/lib/protobuf';
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private grpc: GRPCHealthIndicator,
  ) {}

  @Get()
  check() {
    return this.health.check([
      async () =>
        this.grpc.checkService<GrpcOptions>('hero_service', 'hero', {
          timeout: 2000,
          package: 'hero',
          url: 'localhost:5000',
          protoPath: join(process.cwd(), `${baseUrl}`, 'service-b.proto'),
          healthServiceName: 'HeroService',
        }),
    ]);
  }
}