import UtilsShader from "@app/library/base/shader/utilsShader";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { WalletApiConnectorUI } from "../../WalletApiConnectorUI";
import { WalletApiConnectorContext } from './WalletApiConnectorContext';

let timeout;
let timeoutDelay = 2100;

export const WalletApiConnectorProvider: React.FC<{
  children?: React.ReactNode,
  isAuthorized: boolean,
  connectorWalletShaders: Array<UtilsShader>,
  loader: any,
  isLoaded: boolean
}> = props => {
  const { children, loader = <></>, isLoaded, isAuthorized, connectorWalletShaders } = props;

  const [walletShaders, setWalletShaders] = useState<Array<UtilsShader>>(null);
  const [isTimeoutComplete, setIsTimeoutComplete] = useState<boolean>(false);

  useEffect(() => {
    setWalletShaders(connectorWalletShaders);
  }, [connectorWalletShaders]);

  useEffect(() => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      setIsTimeoutComplete(true);
    }, timeoutDelay);
  }, [isLoaded])

  const provider = {
    walletShaders,
    isAuthorized,
  };

  if (isAuthorized && walletShaders && isLoaded && isTimeoutComplete)
    return <WalletApiConnectorContext.Provider value={provider}>{children}</WalletApiConnectorContext.Provider>;

  return (
    <WalletApiConnectorUI>
      {loader}
    </WalletApiConnectorUI>
  );
};
