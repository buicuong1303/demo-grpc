import { ServiceBGrpcClient } from '@demo-grpc/shared';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ServiceBGrpcClient],
})
export class AppModule {}
