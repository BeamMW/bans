import React, { useEffect, useReducer, useState, useCallback, useMemo } from "react";
import Utils from '../library/base/utils';
import UtilsShader from '../library/base/shader/utilsShader';

//import store from "index";
//import { setSystemState } from '@app/store/SharedStore//actions';
//import { loadAppParams, loadRate } from '@app/store/BansStore/actions';
//import { selectIsLoaded } from '@app/store/SharedStore/selectors';
//import { selectRate } from '@app/store/BansStore/selectors';
import { useSelector, useDispatch } from 'react-redux';
//import { setDappVersion, loadAdminKey } from '@app/store/SharedStore/actions';
import { isObject } from "formik";
//import { setTransactionsRequest } from '@app/store/SharedStore/actions';
import { Loader } from './BeamLoader';
import Window from "./Window";
import ShaderApi, { ShaderStore } from "../library/base/api/ShaderApi";
import methods from "@library/bans/methods";
import { WalletApiConnectorProvider } from "@app/library/wallet-react/context/WalletApiConnector/WalletApiConnectorProvider";
import store from "index";
import { loadAppParams } from "@app/store/BansStore/actions";
import { setDappVersion } from "@app/store/SharedStore/actions";


const shadersData = Array.from([
  ["bans", "6f0e4ccfff83fceef99a7eb07b79d71f5994f46cae94d87d973afc4712d8fbb4", "./bansAppShader.wasm", 0],
], params => new UtilsShader(...params));


const walletEventhandler = ({ walletEventPayload }) => {
  if (walletEventPayload) {
    try {
      switch (walletEventPayload.id) {
        case 'ev_system_state':
          //store.dispatch(setSystemState(walletEventPayload.result));
          //store.dispatch(loadAppParams.request(null));

          break;

        /* case 'ev_txs_changed':
          isObject(walletEventPayload.result) &&
            walletEventPayload.result &&
            store.dispatch(setTransactionsRequest(walletEventPayload.result.txs)); */

        default:
          break;
      }
    } catch (e) {
      console.log("Error has been thrown:", e);
    }
  }
}

export const WalletApiConnector = ({ children }) => {
  const dispatch = useDispatch();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  /**
   * Duplicate ShaderStore logic! In the future have to  resolve to keep one of shaders 'stores'
   */
  const [walletShaders, setWalletShaders] = useState<Array<UtilsShader>>(null);

  //const isLoaded = useSelector(selectIsLoaded());
  //const rate = useSelector(selectRate());
  const isLoaded = true;

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
          Utils.bulkShaderDownload(shadersData, (err, shadersData: Array<UtilsShader>) => {

            err ? (() => { throw new err })() : setIsAuthorized(true);

            const apiShaderRegester: ShaderStore = ShaderApi.useShaderStore;

            /**
             * Put shadersData in ShaderStore
             */
            shadersData.forEach(
              (shaderData) => apiShaderRegester.addShaderToStore(shaderData)
            );

            /**
             * Duplicate put shaders data in wallet provider
             */
            setWalletShaders(shadersData)


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
                  store.dispatch(loadAppParams.request());
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
          });
        });
      } catch (e) {
        console.log("Error has been thrown:", e);
      }
    }
  }, [isAuthorized, isLoaded]/* do not use [] cause halt infinite loop */);

  if (isLoaded) {
    return <WalletApiConnectorProvider
      loader={<Window><Loader /></Window>}
      isAuthorized={isAuthorized}
      connectorWalletShaders={walletShaders}>{children}</WalletApiConnectorProvider>;
  }

  return <></>
};
