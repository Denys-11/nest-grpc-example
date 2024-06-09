import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get('check')
  getHello() {
    return { status: 'ok' };
  }
}
