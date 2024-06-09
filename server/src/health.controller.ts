import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class HealthController {
  constructor() {}

  @GrpcMethod('Health', 'Check')
  check() {
    return { status: 'ok' };
  }
}
