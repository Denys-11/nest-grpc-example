import { DynamicModule } from '@nestjs/common';
import { ClientOptions, ClientsModule, Transport } from '@nestjs/microservices';
import { credentials } from '@grpc/grpc-js';
import { getProtoPath } from 'proto';

export const CITY_PACKAGE: symbol = Symbol('CITY_PACKAGE');

export const GrpcModule: DynamicModule = ClientsModule.registerAsync([
  {
    name: CITY_PACKAGE,
    useFactory: () => {
      return <ClientOptions>{
        transport: Transport.GRPC,
        options: {
          credentials: credentials.createInsecure(),
          url: '0.0.0.0:5020',
          package: ['city'],
          protoPath: [getProtoPath('city.proto')],
        },
      };
    },
  },
]);
