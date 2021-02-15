import { IsNotEmpty, IsNumber, IsBoolean, IsString } from 'class-validator';
export class TableRowDto {
  @IsNotEmpty()
  @IsBoolean()
  public json: boolean;

  @IsNotEmpty()
  @IsString()
  public code: string;

  @IsNotEmpty()
  @IsString()
  public scope: string;

  @IsNotEmpty()
  @IsString()
  public table: string;

  @IsNotEmpty()
  @IsString()
  public tableKey: string;

  @IsNotEmpty()
  @IsString()
  public lowerBound: string;

  @IsNotEmpty()
  @IsString()
  public upperBound: string;

  @IsNotEmpty()
  @IsNumber()
  public indexPosition: number;

  @IsNotEmpty()
  @IsString()
  public keyType: string;

  @IsNotEmpty()
  @IsNumber()
  public limit: number;

  @IsNotEmpty()
  @IsBoolean()
  public reverse: boolean;

  @IsNotEmpty()
  @IsBoolean()
  public showPayer: boolean;
}
