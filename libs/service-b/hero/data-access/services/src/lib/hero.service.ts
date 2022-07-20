import { Injectable } from '@nestjs/common';

@Injectable()
export class HerosService {
  getData(): { message: string } {
    return { message: 'Hero' };
  }
}
