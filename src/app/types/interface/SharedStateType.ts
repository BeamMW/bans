//import { SystemState, Transaction } from '@core/types';

export interface SharedStateType {
  errorMessage: string | null;
  systemState: /* SystemState */ any;
  transactions: /* Transaction[] */ any;
  isLoaded: boolean;
  dappVersion: any;
  adminKey: string;
}
