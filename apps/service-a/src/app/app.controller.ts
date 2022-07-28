import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/check')
  check() {
    return this.appService.check();
  }
  @Get('/get-many')
  getMany() {
    return this.appService.getMany();
  }
}
