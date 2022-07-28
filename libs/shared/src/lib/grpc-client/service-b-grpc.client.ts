import { OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { SERVICE_B } from '../protobuf';
import * as grpc from '@grpc/grpc-js';
import * as fs from 'fs';
const baseUrl = 'libs/shared/src/lib/protobuf';

const credentials = grpc.ChannelCredentials.createSsl(
  fs.readFileSync(
    join(process.cwd(), 'libs/shared/src/lib/ssl', 'public_key_cert.pem')
  ),
  fs.readFileSync(
    join(process.cwd(), 'libs/shared/src/lib/ssl', 'private_key.pem')
  ),
  fs.readFileSync(
    join(process.cwd(), 'libs/shared/src/lib/ssl', 'public_key_cert.pem')
  )
);
export class ServiceBGrpcClient implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'hero',
      protoPath: join(process.cwd(), `${baseUrl}`, 'service-b.proto'),
      url: 'localhost:5000',
      // credentials,

    },
  })
  client: ClientGrpc;

  private _svc: SERVICE_B.IHealthGrpcClient;

  onModuleInit() {
    this._svc = this.client.getService<SERVICE_B.IHealthGrpcClient>('HeroService');
  }

  public get svc(): SERVICE_B.IHealthGrpcClient {
    if (!this._svc) throw new Error('LearningServiceClient not initialized');
    return this._svc;
  }
}
