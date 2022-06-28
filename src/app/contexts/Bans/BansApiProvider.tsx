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
    const bansShader = walletShaders.filter((shader) => shader.cid === "6f0e4ccfff83fceef99a7eb07b79d71f5994f46cae94d87d973afc4712d8fbb4").pop();
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
