import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { CityModule } from './city/city.module';

@Module({
  imports: [CityModule],
  controllers: [HealthController],
})
export class AppModule {}
