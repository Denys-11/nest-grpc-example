import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';

@Module({
  imports: [],
  providers: [CityService],
  controllers: [CityController],
})
export class CityModule {}
