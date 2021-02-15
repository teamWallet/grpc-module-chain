import {
  TransactDto,
  TableRowDto,
  BalanceDto,
  ResponseTableDto,
  ResponseBalanceDto,
  ResponseAllDto,
} from '../dto';

import { Observable } from 'rxjs';

export interface ChainGrpcService {
  transact(request: TransactDto): Observable<ResponseAllDto>;
  getTableRows(request: TableRowDto): Observable<ResponseTableDto>;
  getBalance(request: BalanceDto): Observable<ResponseBalanceDto>;
}
