import { Test, TestingModule } from '@nestjs/testing';
import { ChainService } from './chain.service';
import { LoggerModule } from '@nestcloud/logger';
describe('ChainService', () => {
  let service: ChainService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule.forRoot()],
      providers: [ChainService],
    }).compile();

    service = module.get<ChainService>(ChainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get balance', async () => {
    jest
      .spyOn(service.getApi().rpc, 'get_currency_balance')
      .mockImplementation(
        () => new Promise((resolve) => resolve(['0.1000 EOS'])),
      );
    const balance = await service.getBalance('eosio.token', 'ali', 'EOS');

    expect(balance).toMatch('0.1000 EOS');
  });
});
