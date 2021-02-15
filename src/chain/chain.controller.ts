import { Controller, Inject /*, ValidationPipe */ } from '@nestjs/common';
import { InjectLogger } from '@nestcloud/logger';
import { LoggerInstance } from 'winston';
import { GrpcMethod } from '@nestjs/microservices';
// import { __ as t } from 'i18n';
import { ChainService } from './chain.service';
import {
  BalanceDto,
  ResponseAllDto,
  ResponseBalanceDto,
  ResponseTableDto,
  TransactDto,
  TableRowDto,
} from './dto';
@Controller()
export class ChainController {
  constructor(
    @Inject(ChainService) private readonly chainService: ChainService,
    @InjectLogger() private readonly logger: LoggerInstance,
  ) {}

  @GrpcMethod('ChainService')
  public async getBalance(payload: BalanceDto): Promise<ResponseBalanceDto> {
    this.logger.debug(`getTableRows payload: ${JSON.stringify(payload)}`);
    return {
      balance: await this.chainService.getBalance(
        payload.code,
        payload.name,
        payload.symbol,
      ),
    };
  }

  @GrpcMethod('ChainService')
  public async transact(payload: TransactDto): Promise<ResponseAllDto> {
    payload.actions.forEach((action, idx) => {
      if (typeof action.data === 'string') {
        this.logger.debug(`actions[${idx}]: ${JSON.stringify(action)}`);
        payload.actions[idx].data = JSON.parse(action.data);
      }
    });
    this.logger.debug(`transact payload: ${JSON.stringify(payload)}`);
    return this.chainService.transact(payload.delaySec, payload.actions);
  }

  @GrpcMethod('ChainService')
  public async getTableRows(payload: TableRowDto): Promise<ResponseTableDto> {
    this.logger.debug(`getTableRows payload: ${JSON.stringify(payload)}`);
    return this.chainService.getTableRows(payload);
  }
}
