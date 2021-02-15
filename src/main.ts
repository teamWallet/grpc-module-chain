import { NestLogger } from '@nestcloud/logger';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { ExceptionFilter } from './shared';
import { BOOT, IBoot } from '@nestcloud/common';
import { resolve } from 'path';
import { GRPC } from './config/grpc.config';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule.forRoot({ i18n: 'en-US' }));
  const boot = app.get<IBoot>(BOOT);
  await app.connectMicroservice({
    logger: new NestLogger({
      filePath: resolve(__dirname, '../src/config.yaml'),
    }),
    transport: Transport.GRPC,
    options: {
      url: `${config.get<string>('app.address')}:${boot.get(
        'service.port',
        config.get<string>('app.port'),
      )}`,
      package: GRPC.PACKAGE,
      protoPath: join(__dirname, GRPC.PROTO_PATH),
      loader: {
        arrays: true,
      },
    },
  });

  app.useGlobalFilters(new ExceptionFilter());

  process.on('SIGINT', async () => {
    setTimeout(() => process.exit(1), 5000);
    await app.close();
    process.exit(0);
  });

  // kill -15
  process.on('SIGTERM', async () => {
    setTimeout(() => process.exit(1), 5000);
    await app.close();
    process.exit(0);
  });

  // await app.listenAsync();
  await app.startAllMicroservicesAsync();
  await app.listen(boot.get('service.healthPort'));
}
bootstrap();
