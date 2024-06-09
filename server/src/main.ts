import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { getProtoPath } from 'proto';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:5020',
      package: ['health', 'city'],
      protoPath: [getProtoPath('health.proto'), getProtoPath('city.proto')],
    },
  });
  await app.listen();
}
bootstrap();
