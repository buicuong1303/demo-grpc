/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app/app.module';
import * as grpc from '@grpc/grpc-js';
import * as fs from 'fs';
const baseUrl = 'libs/shared/src/lib/protobuf';
const credentials = grpc.ServerCredentials.createSsl(
  fs.readFileSync(
    join(process.cwd(), 'libs/shared/src/lib/ssl', 'public_key_cert.pem')
  ),
  [
    {
      cert_chain: fs.readFileSync(
        join(process.cwd(), 'libs/shared/src/lib/ssl', 'public_key_cert.pem')
      ),
      private_key: fs.readFileSync(
        join(process.cwd(), 'libs/shared/src/lib/ssl', 'private_key.pem')
      ),
    },
  ],
  true
);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'hero',
      protoPath: join(process.cwd(), `${baseUrl}`, 'service-b.proto'),
      url: 'localhost:5000',
      // credentials,
    },
  });
  await app.startAllMicroservices();
  await app.listen(4001);
  console.log(`Application is running on: ${await app.getUrl()}`);
  // const app = await NestFactory.createMicroservice(AppModule, {
  //   transport: Transport.GRPC,
  //   options: {
  //     package: 'hero',
  //     protoPath: join(process.cwd(), `${baseUrl}`, 'service-b.proto'),
  //   },
  // });
  // app.listen();
  // console.log('Microservice is listening');
}

bootstrap();
