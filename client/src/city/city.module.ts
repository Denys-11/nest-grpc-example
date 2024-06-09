import { GrpcModule } from 'src/grpc-client/grpc-client.module';
import { CityService } from './city.service';
import { Module } from '@nestjs/common';
import { CityController } from './city.controller';

@Module({
  imports: [GrpcModule],
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}
