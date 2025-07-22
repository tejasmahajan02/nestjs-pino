import { Injectable } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

@Injectable()
export class AppService {
    // private readonly logger = new Logger(AppService.name);
    constructor(private readonly logger: Logger){}

  getHello(): string {
    this.logger.error('Hello World.');
    return 'Hello World!';
  }
}
