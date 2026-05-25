import React, { useEffect, useReducer, useState, useCallback, useMemo } from "react";
import connector from '@core/connector';
import UtilsShader from '@library/base/shader/utilsShader';

//import store from "index";
//import { setSystemState } from '@app/store/SharedStore//actions';
//import { loadAppParams, loadRate } from '@app/store/BansStore/actions';
//import { selectIsLoaded } from '@app/store/SharedStore/selectors';
//import { selectRate } from '@app/store/BansStore/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { isObject } from "formik";
//import { setTransactionsRequest } from '@app/store/SharedStore/actions';
import { Loader } from './BeamLoader';
import Window from "./Window";
import ShaderApi, { ShaderStore } from "../library/base/api/ShaderApi";
import methods from "@library/bans/methods";
import { WalletApiConnectorProvider } from "./context/WalletApiConnector/WalletApiConnectorProvider";
import { WalletApiConnectorUI } from "./WalletApiConnectorUI";


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

const bulkShaderDownload = async (shaderList: Array<UtilsShader>) => {
    const sortedShadersData = [...shaderList].sort((a, b) => (a.order < b.order ? 1 : -1));
    await Promise.all(sortedShadersData.map(async (shaderData) => {
        const bytes = await fetch(shaderData.path).then((response) => response.arrayBuffer());
        await shaderData.prepareAndSetShaderBytes(bytes);
    }));
    return sortedShadersData;
};

export const WalletApiConnectorLayer = ({ shadersData, setIsLoaded, children, }) => {
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
            let unsubscribe = null;
            (async () => {
                try {
                    await connector.connect({ headless: false });
                    unsubscribe = connector.on('apiEvent', (full) => walletEventhandler({ walletEventPayload: full }));
                    const downloadedShaders = await bulkShaderDownload(shadersData);

                    setIsAuthorized(true);
                    const apiShaderRegester: ShaderStore = ShaderApi.useShaderStore;
                    downloadedShaders.forEach((shaderData) => apiShaderRegester.addShaderToStore(shaderData));

                    await connector.callApi("ev_subunsub", {
                        "ev_system_state": true,
                        "ev_txs_changed": true,
                    });

                    await connector.callApi("get_version", {});
                    await connector.callApi("create_address", {
                        "type": "regular_new",
                        "expiration": "auto",
                        "comment": "Beam BANS",
                        "new_style_regular": true
                    });
                    await connector.callApi("addr_list", { "own": true });
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

    if (isAuthorized && isLoaded) {
        return (
            <WalletApiConnectorProvider >
                <WalletApiConnectorUI>
                    {children}
                </WalletApiConnectorUI>
            </WalletApiConnectorProvider>
        );
    }

    // In case wallet do not load
    if (isAuthorized && !isLoaded) {
        return <Window><Loader /></Window >;
    }

    return <></>
};
