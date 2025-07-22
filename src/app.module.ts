import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerConfigModule } from './config/logger-config.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    LoggerConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
