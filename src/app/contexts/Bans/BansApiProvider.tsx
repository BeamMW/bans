import { useWalletApiConnector } from "@app/library/wallet-react/context/WalletApiConnector/WalletApiConnectorContext";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { BansApiContext } from "./BansApiContext";


export const BansApiProvider: React.FC = props => {
  const { children } = props;
  const [registeredMethods, setRegisteredMethods] = useState(null);
  const {walletShaders} = useWalletApiConnector();

  useEffect(() => {
    setRegisteredMethods(walletShaders);
  }, [walletShaders]);

  const provider = {
    registeredMethods
  };
  return <BansApiContext.Provider value={provider}>{children}</BansApiContext.Provider>;
};
