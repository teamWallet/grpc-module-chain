import { PermissionLevelDto } from './authority.dto';
// export interface EosActionStruct {
//     account: EosEntityName
//     name: string
//     authorization: {
//       actor: EosEntityName
//       permission: EosEntityName
//     }[]
//     data?: any
//     hex_data?: string
//   }
export interface Action {
  account: string;
  name: string;
  authorization: PermissionLevelDto[];
  data: { [key: string]: any };
}

export interface Extension {
  type: number /*uint16*/;
  data: string /*bytes*/;
}

export interface TransactionHeader {
  expiration: string /*time_point_sec*/;
  refBlockNum: number /*uint16*/;
  refBlockPrefix: number /*uint32*/;
  maxNetUsageWords: number /*varuint32*/;
  maxCpuUsageMs: number /*uint8*/;
  delaySec: number /*varuint32*/;
}

export interface TransactionDto extends TransactionHeader {
  contextFreeActions: Action[];
  actions: Action[];
  transactionExtensions: Extension[];
}
