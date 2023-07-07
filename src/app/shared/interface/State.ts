import { SharedStateType } from '@app/shared/interface/SharedStateType';

export interface AppState {
  shared: SharedStateType;
  main: MainStateType;
}

export interface MainStateType {
  pkey: string | null,
  userData: IUserData | null,
  allDomains: IDomains[] | null,
  isAvailable: string | null,
  assetPrice: number
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
