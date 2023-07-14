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
  assetPrice: number,
  params: IParams | null,
  registrationName: string | null,
  rate: number,
  userDomains: IDomains[] | null
}
export interface IUserData {
  anon:[],
  domains: IDomains[],
  raw:[]
}
export interface PriceInfo {
  aid: number,
  amount: number
}
export interface IDomains {
  hExpire : number,
  key: string,
  name: string
}

export interface IParams {
  ['dao-vault']: string,
  h0: number,
  oracle: string,
  price: string,
  vault: string,
}
