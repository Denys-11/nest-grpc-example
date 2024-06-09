import { Controller } from '@nestjs/common';
import { City, CityService } from './city.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata, ServerWritableStream } from '@grpc/grpc-js';
import { pipeline } from 'node:stream/promises';

type GetById = {
  id: number;
};

@Controller()
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @GrpcMethod('CityService', 'GetById')
  async getById({ id }: GetById) {
    return this.cityService.getById(id);
  }

  @GrpcMethod('CityService', 'GetAll')
  async getAll(
    arguments_: unknown,
    metadata: Metadata,
    responseStream: ServerWritableStream<City, unknown>,
  ) {
    await pipeline(this.cityService.getAll(), responseStream);
  }
}
