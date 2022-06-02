import React, { useState, useCallback, useEffect, useRef } from "react";
import { WalletApiConnectorContext } from './WalletApiConnectorContext';

export const WalletApiConnectorProvider: React.FC = props => {
  const { children } = props;
  
  useEffect(() => {
  }, []);

  useEffect(() => {
    
  }, []);

  const provider = {
  };

  return <WalletApiConnectorContext.Provider value={provider}>{children}</WalletApiConnectorContext.Provider>;
};
