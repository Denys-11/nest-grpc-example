import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CityService } from './city.service';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.cityService.getById(id);
  }
}
