import { Controller, Get } from '@nestjs/common';
import { HerosService } from '@demo-grpc/service-b/hero/data-access/services';
import { GrpcMethod } from '@nestjs/microservices';
import {
  HealthCheckRequest,
  HealthCheckResponse,
  ServingStatus,
} from '@demo-grpc/shared';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';

@Controller()
export class HeroController {
  constructor(private readonly herosService: HerosService) {}

  @Get('/hero')
  getData() {
    return this.herosService.getData();
  }

  @GrpcMethod('HealthNew', 'Check')
  check(
    data: HealthCheckRequest,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>
  ): HealthCheckResponse {
    return {
      status: ServingStatus.SERVING,
    };
  }
}
