import { Injectable } from '@nestjs/common';
import {ServiceBGrpcClient} from '@demo-grpc/shared'
import { lastValueFrom } from 'rxjs';
@Injectable()
export class AppService {
  constructor(
    private _serviceB: ServiceBGrpcClient
  ){}
  getData(): Promise<any> {
    return lastValueFrom(this._serviceB.svc.getHero({id: 1}));
  }
}
