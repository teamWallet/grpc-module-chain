import { IsNotEmpty, IsString } from 'class-validator';
export class BalanceDto {
  @IsNotEmpty()
  @IsString()
  public readonly code: string;
  @IsNotEmpty()
  @IsString()
  public readonly name: string;
  @IsNotEmpty()
  @IsString()
  public readonly symbol: string;
}
