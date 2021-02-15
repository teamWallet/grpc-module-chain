import {
  ArgumentsHost,
  Catch,
  //   NotFoundException,
  RpcExceptionFilter,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
// import moment = require('moment');
import { Observable, throwError } from 'rxjs';
@Catch(RpcException)
export class ExceptionFilter implements RpcExceptionFilter<RpcException> {
  public catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    const exceptionError = exception.getError() as any;
    console.log(host);
    return throwError(exceptionError);
  }
}
