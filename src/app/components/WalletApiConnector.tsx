import React, { useEffect, useReducer, useState, useCallback, useMemo } from "react";
import connector from '@core/connector';
import UtilsShader from '../library/base/shader/utilsShader';

//import store from "index";
import { setSystemState } from '@app/store/SharedStore/actions';
import { selectIsLoaded } from '@app/store/SharedStore/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { isObject } from "formik";
import { setTransactionsRequest } from '@app/store/SharedStore/actions';
import { Loader } from './BeamLoader';
import Window from "./Window";
import ShaderApi, { ShaderStore } from "../library/base/api/ShaderApi";
import methods from "@library/bans/methods";
import { WalletApiConnectorProvider } from "@app/library/wallet-react/context/WalletApiConnector/WalletApiConnectorProvider";
import store from "index";
import { loadAppParams, loadRate } from "@app/store/BansStore/actions";
import { setDappVersion } from "@app/store/SharedStore/actions";
import { observeDatabaseChanges, userDatabase } from "@app/library/bans/userLocalDatabase/";
import { selectRate } from "@app/store/BansStore/selectors";
import { BANS_CID } from "@app/constants";
import { reinitNotifications, updateNotifications } from "@app/store/NotificationsStore/actions";

const shadersData = Array.from([
  ["bans", BANS_CID, "./bansAppShader.wasm", 0],
], params => new UtilsShader(...params));

const bulkShaderDownload = async (shaderList: Array<UtilsShader>) => {
  const sortedShadersData = [...shaderList].sort((a, b) => (a.order < b.order ? 1 : -1));
  await Promise.all(sortedShadersData.map(async (shaderData) => {
    const bytes = await fetch(shaderData.path).then((response) => response.arrayBuffer());
    await shaderData.prepareAndSetShaderBytes(bytes);
  }));
  return sortedShadersData;
};

/**
 * Beam API v7.3: events use `{ id: "ev_*", result: {...} }`.
 * Some transports use JSON-RPC style `{ method: "ev_*", params: {...} }`.
 */
const walletEventhandler = ({ walletEventPayload }) => {
  if (walletEventPayload) {
    try {
      const eventId = walletEventPayload.id ?? walletEventPayload.method;
      const payload = walletEventPayload.result ?? walletEventPayload.params;

      switch (eventId) {
        case 'ev_system_state':
          if (payload && typeof payload === 'object') {
            store.dispatch(setSystemState(payload));
          }
          break;

        case 'ev_txs_changed':
          isObject(payload) && payload && store.dispatch(setTransactionsRequest(payload.txs));

          break;

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
  const rate = useSelector(selectRate);

  /**
   * Duplicate ShaderStore logic! In the future have to  resolve to keep one of shaders 'stores'
   */
  const [walletShaders, setWalletShaders] = useState<Array<UtilsShader>>(null);

  const isLoaded = useSelector(selectIsLoaded);

  useEffect(() => {
    if (!isAuthorized) {
      let unsubscribe = null;
      (async () => {
        try {
          await connector.connect({ headless: false });
          unsubscribe = connector.on('apiEvent', (full) => walletEventhandler({ walletEventPayload: full }));

          const downloadedShaders = await bulkShaderDownload(shadersData);
          setIsAuthorized(true);

          const apiShaderRegester: ShaderStore = ShaderApi.useShaderStore;
          downloadedShaders.forEach((shaderData) => apiShaderRegester.addShaderToStore(shaderData));
          setWalletShaders(downloadedShaders);

          if (rate.isZero) {
            dispatch(loadRate.request());
          }

          await connector.callApi("ev_subunsub", {
            "ev_system_state": true,
            "ev_txs_changed": true,
          });
          try {
            const status = await connector.callApi("wallet_status", {});
            if (status && typeof status === "object") {
              store.dispatch(setSystemState(status));
            }
          } catch (e) {
            console.log("wallet_status failed:", e);
          }
          store.dispatch(loadAppParams.request());

          const version = await connector.callApi("get_version", {});
          if (version) {
            store.dispatch(setDappVersion(version));
          }

          userDatabase.openDatabase();
          if (userDatabase.isOpen) {
            observeDatabaseChanges(userDatabase, changes => {
              changes.forEach(function (change) {
                if (change.table != "notifications") return;

                switch (change.type) {
                  case 1:
                    store.dispatch(updateNotifications.request(change.obj));
                    break;
                  case 2:
                    store.dispatch(reinitNotifications.request(true));
                    break;
                  case 3:
                    store.dispatch(reinitNotifications.request(true));
                    break;
                }
              });
            })
          }
        } catch (e) {
          console.log("Error has been thrown:", e);
        }
      })();

      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, [isAuthorized, isLoaded]/* do not use [] cause halt infinite loop */);

  return <WalletApiConnectorProvider
    isLoaded={isLoaded}
    loader={<Window><Loader /></Window>}
    isAuthorized={isAuthorized}
    connectorWalletShaders={walletShaders}>{children}</WalletApiConnectorProvider>;
};
