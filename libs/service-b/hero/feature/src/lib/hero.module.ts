import { HerosService } from '@demo-grpc/service-b/hero/data-access/services';
import { Module } from '@nestjs/common';
import { HeroController } from './hero.controller';

@Module({
  imports: [],
  controllers: [HeroController],
  providers: [HerosService],
  exports: [HerosService],
})
export class HeroModule {}
