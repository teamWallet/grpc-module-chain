import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

// https://github.com/CoinageCrypto/lamington/blob/4f389f5030fcd217f855352d0436c533341924a1/src/accounts/updateAuth.ts
export class PermissionLevelDto {
  @IsNotEmpty()
  @IsString()
  public actor: string;

  @IsNotEmpty()
  @IsString()
  public permission: string;
}

export class PermissionLevelWeightDto {
  @ValidateNested()
  public permission: PermissionLevelDto;

  @IsNumber()
  public weight: number;
}
export class WeightWaitDto {
  @IsNumber()
  public seconds: number;

  @IsNumber()
  public weight: number; // not sure if needed
}

export class KeyWaitDto {
  @IsString()
  public key: string;

  @IsNumber()
  public weight: number; // not sure if needed
}

export class AuthorityDto {
  @IsNumber()
  public threshold: number;

  @ValidateNested()
  public keys: KeyWaitDto[];

  @ValidateNested()
  public accounts: PermissionLevelWeightDto[];

  @ValidateNested()
  public waits: WeightWaitDto[];
}
