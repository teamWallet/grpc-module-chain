// import { Boot, InjectBoot } from '@nestcloud/boot';
// import { InjectConfig } from '@nestcloud/config';
import { InjectLogger } from '@nestcloud/logger';
// import { InjectService } from '@nestcloud/service';
import { /*forwardRef, */ Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import * as globalLocalConfig from 'config';
import { Api, JsonRpc } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import { stringify } from 'flatted';
// import { __ as t } from 'i18n';
import * as fetch from 'node-fetch';
import { TextDecoder, TextEncoder } from 'text-encoding';
import { LoggerInstance } from 'winston';
import { ApiMsgCode } from '../shared';
import { TableRowDto, Action, ResponseAllDto, ResponseTableDto } from './dto';

function getChainErorr(error: Error): string {
  return error instanceof Error
    ? `${error.name} ${error.message}`
    : stringify(error);
}

@Injectable()
export class ChainService {
  private readonly api: Api;
  constructor(@InjectLogger() private readonly logger: LoggerInstance) {
    const privkey: string = globalLocalConfig.get(
      'accounts.acctsmanager.privkey',
    );
    const rpcEndpoint: string = globalLocalConfig.get('rpcEndpoints');
    // console.log('rpcEndpoint======', rpcEndpoint);
    const signatureProvider = new JsSignatureProvider([privkey]);
    const rpc = new JsonRpc(rpcEndpoint[0], { fetch });
    this.api = new Api({
      rpc,
      signatureProvider,
      textDecoder: new TextDecoder(),
      textEncoder: new TextEncoder(),
    });
  }

  public async getBalance(
    code: string,
    name: string,
    symbol: string,
  ): Promise<string> {
    try {
      const balance = await this.api.rpc.get_currency_balance(
        code,
        name,
        symbol,
      );
      return Array.isArray(balance) &&
        balance.length !== 0 &&
        typeof balance[0] === 'string'
        ? balance[0]
        : ``;
    } catch (error) {
      this.logger.error('getBalance failed', error.stack, ChainService.name);
      throw new RpcException({
        code: ApiMsgCode.CHAIN_GETBALANCE_FAILED,
        message: getChainErorr(error),
      });
    }
  }

  public async transact(
    delaySec: number,
    actions: Action[],
  ): Promise<ResponseAllDto> {
    try {
      const res = await this.api.transact(
        {
          delay_sec: delaySec,
          actions: actions,
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        },
      );

      const resp: ResponseAllDto = { transactionId: res.transaction_id };

      return resp;
    } catch (error) {
      this.logger.error('transact failed', error.stack, ChainService.name);
      throw new RpcException({
        code: ApiMsgCode.CHAIN_TRANSCAT_FAILED,
        message: getChainErorr(error),
      });
    }
  }

  public async getTableRows(
    tableParams: TableRowDto,
  ): Promise<ResponseTableDto> {
    try {
      const res = await this.api.rpc.get_table_rows({
        json: tableParams.json,
        code: tableParams.code,
        scope: tableParams.scope,
        table: tableParams.table,
        table_key: tableParams.tableKey,
        lower_bound: tableParams.lowerBound,
        upper_bound: tableParams.upperBound,
        index_position: tableParams.indexPosition,
        key_type: tableParams.keyType,
        limit: tableParams.limit,
        reverse: tableParams.reverse,
        show_payer: tableParams.showPayer,
      });

      if (res && res.rows[0]) {
        res.rows = JSON.stringify(res.rows);
      }
      return {
        rows: res.rows,
        more: res.more,
        nextKey: res.next_key,
      };
    } catch (error) {
      this.logger.error('transact failed', error.stack, ChainService.name);
      throw new RpcException({
        code: ApiMsgCode.CHAIN_GETTABLEROW_FAILED,
        message: getChainErorr(error),
      });
    }
  }
  // for test mock
  public getApi(): Api {
    return this.api;
  }
}
