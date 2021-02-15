import { DynamicModule, Inject, Module, OnModuleInit } from '@nestjs/common';

import { BootModule } from '@nestcloud/boot';
import { LoggerModule } from '@nestcloud/logger';

import { configure as i18nConfigure } from 'i18n';
import { ChainController } from './chain/chain.controller';
import { ChainService } from './chain/chain.service';
import { HealthModule } from './health/health.module';
import { resolve } from 'path';

@Module({
  imports: [
    BootModule.forRoot({
      filePath: resolve(__dirname, '../src/config.yaml'),
    }),
    LoggerModule.forRoot(),
    HealthModule,
  ],
  controllers: [ChainController],
  providers: [ChainService],
})
export class AppModule implements OnModuleInit {
  constructor(
    @Inject(ChainService) private readonly chainService: ChainService, // @InjectRepository(User) private readonly userRepo: Repository<User>
  ) {}
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  onModuleInit() {
    // throw new Error('Method not implemented.');
  }
  public static forRoot(options: { i18n: 'en-US' | 'zh-CN' }): DynamicModule {
    i18nConfigure({
      locales: ['en-US', 'zh-CN'],
      defaultLocale: options.i18n,
      directory: 'src/i18n',
    });
    return {
      module: AppModule,
    };
  }
  // public async onModuleInit() {}
}
