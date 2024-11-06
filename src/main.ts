import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import { AppModule } from './app.module';

async function bootstrap() {
  const mb = 1048576;

  // `bodyLimit` is specified in bytes
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      bodyLimit: mb * 10
    })
  );

  app.enableCors();

  await app.listen(+process.env.PORT);
  Logger.log('Listening on ' + process.env.PORT, 'NestApplication');
}

bootstrap();
