import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Action } from './transaction.dto';
export class TransactDto {
  @IsNotEmpty()
  @IsNumber()
  public delaySec: number;

  @ValidateNested()
  public actions: Action[];
}
