import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { transformGrpcToHttpException } from 'src/exception/grpc-to-http.exception-transformer';
import { CITY_PACKAGE } from 'src/grpc-client/grpc-client.module';
import { city } from 'src/proto/city';

@Injectable()
export class CityService implements OnModuleInit {
  private service: city.CityService;

  constructor(@Inject(CITY_PACKAGE) private client: ClientGrpc) {}

  onModuleInit() {
    this.service = this.client.getService<city.CityService>('CityService');
  }

  async getById(id: number): Promise<city.City> {
    return lastValueFrom(this.service.getById({ id })).catch(
      transformGrpcToHttpException,
    );
  }
}
