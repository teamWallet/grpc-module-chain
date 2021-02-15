import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication } from '@nestjs/common';
import { Transport, ClientGrpc, ClientsModule } from '@nestjs/microservices';
import { join } from 'path';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ChainGrpcService } from '../src/chain/interfaces/chain-grpc.interface';
describe('AppController (e2e)', () => {
  let app: INestApplication;
  let ChainGrpcService: ChainGrpcService;
  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [
        AppModule,
        ClientsModule.register([
          {
            name: 'CHAIN_PACKAGE',
            transport: Transport.GRPC,
            options: {
              package: 'utu_module_chain',
              protoPath: join(
                __dirname,
                '../src/protobufs/utu-module-chain.proto',
              ),
            },
          },
        ]),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.connectMicroservice({
      transport: Transport.GRPC,
      options: {
        package: 'utu_module_chain',
        protoPath: join(__dirname, '../src/protobufs/utu-module-chain.proto'),
        loader: {
          arrays: true,
        },
      },
    });
    await app.startAllMicroservicesAsync();
    await app.init();
    ChainGrpcService = app
      .get<ClientGrpc>('CHAIN_PACKAGE')
      .getService<ChainGrpcService>('ChainService');
  });
  it('should be defined', () => {
    expect(app).toBeDefined();
    expect(ChainGrpcService).toBeDefined();
  });
  it('should get the balance', async (done) => {
    ChainGrpcService.getBalance({
      code: 'eosio.token',
      name: 'ali1',
      symbol: 'EOS',
    }).subscribe((response) => {
      expect(response).toMatchObject({ balance: '0.1000 EOS' });
      done();
    });
  });
});
