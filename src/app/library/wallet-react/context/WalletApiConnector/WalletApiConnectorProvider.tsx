import UtilsShader from "@app/library/base/shader/utilsShader";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { WalletApiConnectorContext } from './WalletApiConnectorContext';

export const WalletApiConnectorProvider: React.FC<{children?: React.ReactNode, isAuthorized:boolean, connectorWalletShaders: Array<UtilsShader>, loader: any }> = props => {
  const { children, loader, isAuthorized, connectorWalletShaders } = props;

  const [walletShaders, setWalletShaders] = useState<Array<UtilsShader>>(null);
  
  useEffect(() => {
    setWalletShaders(connectorWalletShaders);
  }, [connectorWalletShaders]);

  const provider = {
    walletShaders,
    isAuthorized,
  };

  if(isAuthorized && walletShaders)
    return <WalletApiConnectorContext.Provider value={provider}>{children}</WalletApiConnectorContext.Provider>;

  return <>{loader}</>;
};
