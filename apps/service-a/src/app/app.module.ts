import { ServiceBGrpcClient } from '@demo-grpc/shared';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from '@demo-grpc/service-a/core';
@Module({
  imports: [CoreModule],
  controllers: [AppController],
  providers: [AppService, ServiceBGrpcClient],
})
export class AppModule {}
