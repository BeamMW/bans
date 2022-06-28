import methods from "@app/library/bans/methods";
import { ShaderActions } from "@app/library/bans/types";
import ShaderApi from "@app/library/base/api/ShaderApi";
import { useWalletApiConnector } from "@app/library/wallet-react/context/WalletApiConnector/WalletApiConnectorContext";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { BansApiContext } from "./BansContexts";
import cloneDeep from 'lodash/cloneDeep';

let globalApiProviderValue: any/* ShaderActions */ = null;
export const getGlobalApiProviderValue = () => globalApiProviderValue;


export const BansApiProvider: React.FC = props => {
  const { children } = props;
  
  const [registeredMethods, setRegisteredMethods] = useState(null);
  const {walletShaders} = useWalletApiConnector();

  useEffect(() => {
    const bansShader = walletShaders.filter((shader) => shader.cid === "a4733a5eb63b9ea8a3831d95ce26144a69e5a3fc48a881b2362be7de860f2956").pop();
    const api = new ShaderApi(bansShader, methods);

    setRegisteredMethods(api.getRegisteredMethods());

    //for direct access outside of BansApiProvider throught getGlobalApiProviderValue function
    globalApiProviderValue = cloneDeep(registeredMethods);
    
  }, [walletShaders]);

  const provider = {
    registeredMethods
  };
  return <BansApiContext.Provider value={provider}>{children}</BansApiContext.Provider>;
};
