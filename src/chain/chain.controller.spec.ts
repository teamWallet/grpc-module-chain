import { Test, TestingModule } from '@nestjs/testing';
import { ChainController } from './chain.controller';
import { ChainService } from './chain.service';
import { LoggerModule } from '@nestcloud/logger';

describe('Chain Controller', () => {
  let chainService: ChainService;
  let controller: ChainController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule.forRoot()],
      controllers: [ChainController],
      providers: [ChainService],
    }).compile();

    chainService = module.get<ChainService>(ChainService);
    controller = module.get<ChainController>(ChainController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(chainService).toBeDefined();
  });
  it('should get balance', async () => {
    jest
      .spyOn(chainService, 'getBalance')
      .mockImplementation(
        () => new Promise((resolve) => resolve('0.1000 EOS')),
      );
    const balance = await controller.getBalance({
      code: 'eosio.token',
      name: 'ali',
      symbol: 'EOS',
    });

    expect(balance).toMatchObject({ balance: '0.1000 EOS' });
  });
});
