/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Controller, Get } from '@nestjs/common';
import { HerosService } from '@demo-grpc/service-b/hero/data-access/services';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import {
  HealthCheckRequest,
  HealthCheckResponse,
  ServingStatus,
} from '@demo-grpc/shared';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Observable, Subject } from 'rxjs';
import { HeroById } from './interfaces/hero-by-id.interface';
import { Hero } from './interfaces/hero.interface';

@Controller()
export class HeroController {
  constructor(private readonly herosService: HerosService) {}
  private readonly items: Hero[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' },
  ];
  @Get('/hero')
  getData() {
    return this.herosService.getData();
  }

  @GrpcMethod('HeroService', 'Check')
  check(
    data: HealthCheckRequest,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>
  ): HealthCheckResponse {
    console.log('check')
    return {
      status: ServingStatus.SERVING,
    };
  }

  @GrpcStreamMethod('HeroService')
  findMany(data$: Observable<HeroById>): Observable<Hero> {
    console.log('get many') 
    const hero$ = new Subject<Hero>();
    const onNext = (heroById: HeroById) => {
      const item = this.items.find(({ id }) => id === heroById.id);
      hero$.next(item);
    };
    const onComplete = () => {
      console.log('completed');
      return  hero$.complete()
    };
    data$.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return hero$.asObservable();
  }
}
