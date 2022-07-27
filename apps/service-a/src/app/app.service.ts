import { Injectable } from '@nestjs/common';
import { ServiceBGrpcClient } from '@demo-grpc/shared';
import { lastValueFrom } from 'rxjs';
@Injectable()
export class AppService {
  constructor(private _serviceB: ServiceBGrpcClient) {}
check(): Promise<any> {
    return lastValueFrom(this._serviceB.svc.check({service: 'service-b'}));
  }
}
