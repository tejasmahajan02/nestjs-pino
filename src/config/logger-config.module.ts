import { Global, Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import * as rfs from 'rotating-file-stream';
import * as fs from 'fs';
import * as path from 'path';
import { Options as PinoHttpOptions } from 'pino-http';

export const createLogStream = () => {
  const logDir = path.join(process.cwd(), 'logs');
  if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

  return rfs.createStream(
    (time, index) => {
      if (!time) return 'app.log'; // for initial stream
      const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
      return `app-${date}-${index}.log.gz`;
    },
    {
      size: '10M',
      interval: '1d',
      compress: 'gzip',
      path: logDir,
    },
  );
};

export const getPinoHttpConfig = (): PinoHttpOptions => {
  const isProd = process.env.NODE_ENV === 'production';

  return isProd
    ? {
        level: 'error',
        stream: createLogStream(),
      }
    : {
      
        transport: {
          target: 'pino-pretty',
          options: { singleLine: true },
        },
      };
};

@Global()
@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: getPinoHttpConfig(),
    }),
  ],
})
export class LoggerConfigModule {}
