import { Injectable } from '@nestjs/common';
import { ServiceBGrpcClient } from '@demo-grpc/shared';
import { lastValueFrom, ReplaySubject, tap, toArray } from 'rxjs';
import { HeroById } from '@demo-grpc/service-b/hero/feature';
@Injectable()
export class AppService {
  constructor(private _serviceB: ServiceBGrpcClient) {}
  check() {
    // this._serviceB.svc.check({ service: 'service-b' })
    return lastValueFrom(this._serviceB.svc.check({ service: 'service-b' }));
  }

  async getMany() {
    const ids$ = new ReplaySubject<HeroById>();
    ids$.next({ id: 1 });
    ids$.next({ id: 2 });
    ids$.complete();

    const stream = this._serviceB.svc.findMany(ids$.asObservable());
    return stream.pipe(toArray());
  }
}
