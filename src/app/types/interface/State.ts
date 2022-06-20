import { SharedStateType } from '@app/types/interface/SharedStateType';
//import { BansStateType } from '@app/types/interface';

export interface AppState {
  shared: SharedStateType;
  main: /* BansStateType */any;
  bans: any;
}
