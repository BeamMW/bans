import React, { useEffect, useReducer, useState, useCallback, useMemo } from "react";
import Utils from '../library/base/utils';
import store from "index";
import { setSystemState } from '@app/store/SharedStore//actions';
import { loadAppParams, loadRate } from '@app/store/BansStore/actions';
import { selectIsLoaded } from '@app/store/SharedStore/selectors';
import { selectRate } from '@app/store/BansStore/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { setDappVersion, loadAdminKey } from '@app/store/SharedStore/actions';
import { isObject } from "formik";
import { setTransactionsRequest } from '@app/store/SharedStore/actions';
import { Loader } from './BeamLoader';
import Window from "./Window";

const walletEventhandler = ({ walletEventPayload }) => {

  if (walletEventPayload) {
    try {
      switch (walletEventPayload.id) {
        case 'ev_system_state':
          store.dispatch(setSystemState(walletEventPayload.result));
          store.dispatch(loadAppParams.request(null));

          break;

        case 'ev_txs_changed':
          isObject(walletEventPayload.result) &&
            walletEventPayload.result &&
            store.dispatch(setTransactionsRequest(walletEventPayload.result.txs));

        default:
          break;
      }
    } catch (e) {
      console.log("Error has been thrown:", e);
    }
  }
}

export const WalletApiConnector = ({ children, }) => {
  const dispatch = useDispatch();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const isLoaded = useSelector(selectIsLoaded());
  const rate = useSelector(selectRate());

  useEffect(() => {
    if (!isAuthorized) {
      try {
        Utils.initialize({
          "appname": "BEAM DAO BANS APP",
          "min_api_version": "6.3",
          "headless": false,
          "apiResultHandler": (error, result, full) => {
            console.log('api result data: ', full);
            result && walletEventhandler({ walletEventPayload: full });
          }
        }, (err) => {
          Utils.download("./bansAppShader.wasm", (err, bytes) => {

            err ? (() => {throw new err})() : setIsAuthorized(true);

            Utils.callApi("ev_subunsub", {
              /* "ev_sync_progress": true, */
              "ev_system_state": true,
              "ev_txs_changed": true,

              //Can't use thos events due to dapp restriction??
              /* "ev_utxos_changed": true, 
              "ev_assets_changed": true,
              "ev_addrs_changed": true, */
            },
              (error, result, full) => {
                if (result) {
                  store.dispatch(loadAppParams.request(bytes));
                }
              }
            );

            Utils.callApi("get_version", false,
              (error, result, full) => {
                if (error) {
                  throw new Error("version could't fetch!");
                }

                if (result) {
                  store.dispatch(setDappVersion(result));
                }
              }
            );

            /* Utils.callApi("create_address", {
              "type": "regular_new",
              "expiration": "auto",
              "comment": "Beam Dao BANS",
              "new_style_regular": true
            },
              (error, result, full) => {
                if (error) {
                  throw new Error("version could't fetch!");
                }

                if (result) {
                  console.log("create_address", result);
                }
              }
            ); */

            /* Utils.callApi("addr_list", {
              "own": true
            },
              (error, result, full) => {
                if (error) {
                  throw new Error("version could't fetch!");
                }

                if (result) {
                  console.log("create_address", result);
                }
              }
            ); */

          });
          

        });
      } catch (e) {
        console.log("Error has been thrown:", e);
      }
    }
  }, [isAuthorized, isLoaded]/* do not use [] cause halt infinite loop */);

  if (isAuthorized && isLoaded) {
    return <>{children}</>;
  }

  // In case wallet do not load
  if (isAuthorized && !isLoaded) {
    return <Window><Loader /></Window>;
  }

  return <></>
};
