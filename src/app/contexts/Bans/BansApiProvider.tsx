import methods from "@app/library/bans/methods";
import { ShaderActions } from "@app/library/bans/types";
import ShaderApi from "@app/library/base/api/ShaderApi";
import { useWalletApiConnector } from "@app/library/wallet-react/context/WalletApiConnector/WalletApiConnectorContext";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { BansApiContext } from "./BansContexts";
import cloneDeep from 'lodash/cloneDeep';
import { BANS_CID } from "@app/constants";

let globalApiProviderValue: any/* ShaderActions */ = null;
export const getGlobalApiProviderValue = () => globalApiProviderValue;


export const BansApiProvider: React.FC = props => {
  const { children } = props;
  
  const [registeredMethods, setRegisteredMethods] = useState(null);
  const {walletShaders} = useWalletApiConnector();

  useEffect(() => {
    const bansShader = walletShaders.filter((shader) => shader.cid === BANS_CID).pop();
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
