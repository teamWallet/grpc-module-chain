import { IsNotEmpty, IsString } from 'class-validator';

export class CallActionDto {
  @IsNotEmpty()
  @IsString()
  public readonly codeStr: string;
  @IsNotEmpty()
  @IsString()
  public readonly funcName: string;
  @IsNotEmpty()
  @IsString()
  public readonly paramsStr: string;
  @IsNotEmpty()
  @IsString()
  public readonly delimiter: string;
}
