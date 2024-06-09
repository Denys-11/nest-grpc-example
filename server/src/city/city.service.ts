import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

export type City = {
  id: number;
  name: string;
  country: string;
  population: number;
};

@Injectable()
export class CityService implements OnModuleInit {
  private cities: City[] = [];

  async onModuleInit() {
    const data = await readFile(
      path.join(__dirname, '../data/cities.json'),
      'utf8',
    );
    this.cities = JSON.parse(data).slice(0, 100);
  }

  async getById(id: number) {
    const city = this.cities.find((city) => city.id === id);

    if (!city) {
      throw new RpcException({
        message: 'City not found',
        code: status.NOT_FOUND,
      });
    }

    return city;
  }

  async *getAll() {
    for (const city of this.cities) {
      yield city;
    }
  }
}
