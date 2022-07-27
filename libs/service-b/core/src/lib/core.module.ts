import { Module } from '@nestjs/common';
import { HeroModule } from '@demo-grpc/service-b/hero/feature';
@Module({
  imports: [HeroModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class CoreModule {}
