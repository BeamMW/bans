import Utils from '@core/utils.js';
import { IUserUpdate, IUserViewPrePhase } from '@app/shared/interface/Request';
import { IPayRequest, IRegistrDomain } from '@app/shared/interface/RequestType';
import { toGroths } from '@core/appUtils';
import {IParams} from '@app/shared/interface';

const dappnet = '560881a267df92b45d48a1dc6495fdd29b37878e1040b22b1c4f1ea13b467dc9';
const mainnet = 'ec160307c43bc3fc0c3a52d3e3d3dfd8101593e8cec7a907fc42c9f103aabbae';
const CID = dappnet;

export function onMakeTx(err, sres, full, params: { id: number, vote: number } = null, toasted: string = null) {
  if (err) {
    console.log(err, 'Failed to generate transaction request');
  }
  return new Promise((resolve) => {
    Utils.callApi('process_invoke_data', { data: full.result.raw_data }, (error, result) => {
      resolve(result);
    });
  });
}
export function ViewParams(payload): Promise<IParams> {
  return new Promise((resolve, reject) => {
    Utils.invokeContract(
      `role=manager, action=view_params, cid=${CID}`,
      (error, result, full) => {
        if (!error) {
          resolve(result.res);
          console.log('res,', result);
        } else {
          reject(error.error);
          console.log('error', error);
        }
      },
      payload || null,
    );
  });
}

export function UserView<T = any>(): Promise<T> {
  return new Promise((resolve, reject) => {
    Utils.invokeContract(
      `role=user, action=view, cid=${CID}`,
      (error, result, full) => {
        if (!error) {
          resolve(result.res);
        } else reject(error.error);
      },
    );
  });
}
export function GetUserKey<T = any>(payload): Promise<T> {
  return new Promise((resolve, reject) => {
    Utils.invokeContract(
      `role=user, action=my_key, cid=${CID}`,
      (error, result, full) => {
        if (!error) {
          resolve(result.res);
        } else reject(error.error);
      },
      payload || null,
    );
  });
}
export function SearchDomain<T = any>(): Promise<T> {
  return new Promise((resolve, reject) => {
    Utils.invokeContract(
      `role=manager, action=view_domain, cid=${CID}`,
      (error, result, full) => {
        if (!error) {
          resolve(result.domains);
        } else reject(error.error);
      },
    );
  });
}
export function ViewName<T = any>(name: string): Promise<T> {
  return new Promise((resolve, reject) => {
    Utils.invokeContract(
      `role=manager, action=view_name, name=${name}, cid=${CID}`,
      (error, result, full) => {
        console.log({ full });
        if (!error) {
          console.log(result);
          resolve(result.res);
        } else reject(error);
      },
    );
  });
}

export function payDomain<T = any>({ domain, amount } : IPayRequest): Promise<T> {
  return new Promise((resolve, reject) => {
    Utils.invokeContract(
      `role=manager, action=pay, name=${domain}, amount=${toGroths(+amount)}, cid=${CID}`,
      (error, result, full) => {
        onMakeTx(error, result, full);
      },
    );
  });
}
export function registrDomain<T = any>({ domain, period } : IRegistrDomain): Promise<T> {
  console.log({domain, period});
  return new Promise((resolve, reject) => {
    Utils.invokeContract(
      `role=user, action=domain_register, name=${domain}, nPeriods=${period}, cid=${CID}`,
      (error, result, full) => {
        onMakeTx(error, result, full);
      },
    );
  });
}

export function UserLockPrePhase<T = any>({ amountLpToken, lockPeriods }:IUserViewPrePhase): Promise<T> {
  return new Promise((resolve, reject) => {
    Utils.invokeContract(
      `
    action=user_lock,
    cid=${CID},
    amountLpToken=${amountLpToken},
    lockPeriods=${lockPeriods}`,
      (error, result, full) => {
        if (!error) {
          onMakeTx(error, result, full).then((res) => {
            if (res) {
              resolve(res);
            }
            resolve(result);
          });
        } else {
          reject(error.error);
        }
      },
    );
  });
}
export function UserUpdate<T = any>({ withdrawBeamX, withdrawLpToken, hEnd }:IUserUpdate): Promise<T> {
  return new Promise((resolve, reject) => {
    Utils.invokeContract(
      `
    action=user_update,
    cid=${CID},
    withdrawBeamX=${withdrawBeamX},
    withdrawLpToken=${withdrawLpToken},
    hEnd=${hEnd}`,
      (error, result, full) => {
        if (!error) {
          onMakeTx(error, result, full).then((res) => {
            if (res) {
              resolve(res);
            }
            resolve(result);
          });
        } else {
          reject(error.error);
        }
      },
    );
  });
}
export function UserGetYield<T = any>({ amountLpToken, lockPeriods }:IUserViewPrePhase): Promise<T> {
  return new Promise((resolve, reject) => {
    Utils.invokeContract(
      `
    action=get_yield,
    cid=${CID},
    amountLpToken=${amountLpToken},
    lockPeriods=${lockPeriods}`,
      (error, result, full) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error.error);
        }
      },
    );
  });
}
