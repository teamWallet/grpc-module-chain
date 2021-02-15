import { IsNotEmpty, IsString } from 'class-validator';
export class ExtendedAssetDto {
  @IsNotEmpty()
  @IsString()
  public readonly contract: string;
  @IsNotEmpty()
  @IsString()
  public readonly quantity: string;
}
