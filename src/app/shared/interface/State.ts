import { SharedStateType } from '@app/shared/interface/SharedStateType';

export interface AppState {
  shared: SharedStateType;
  main: any;
}

export interface MainStateType {
  pkey: string | null,
  userData: IUserData | null,
  allDomains: IDomains[] | null,
  isValid: boolean,
}
export interface IUserData {
  anon:[],
  domains: IDomains[],
  raw:[]
}
export interface IDomains {
  hExpire : number,
  key: string,
  name: string
}
