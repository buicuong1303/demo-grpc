import { Controller, Get } from '@nestjs/common';
import { HerosService } from '@demo-grpc/service-b/hero/data-access/services';
import { GrpcMethod } from '@nestjs/microservices';
import { SERVICE_B } from '@demo-grpc/shared';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';

@Controller()
export class HeroController {
  constructor(private readonly herosService: HerosService) {}

  @Get('/hero')
  getData() {
    return this.herosService.getData();
  }

  @GrpcMethod('ServiceB', 'GetHero')
  getHero(data: SERVICE_B.HeroById, metadata: Metadata, call: ServerUnaryCall<any, any>): SERVICE_B.HeroResponse {
    const items = [
      { id: 1, name: 'HuHA' },
      { id: 2, name: 'Doe' },
    ];
    return items.find(({ id }) => id === data.id);
  }
}
