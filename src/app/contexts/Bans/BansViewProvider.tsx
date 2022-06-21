import methods from "@app/library/bans/methods";
import ShaderApi from "@app/library/base/api/ShaderApi";
import { useWalletApiConnector } from "@app/library/wallet-react/context/WalletApiConnector/WalletApiConnectorContext";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { BansContext } from "./BansContexts";


export const BansViewProvider: React.FC = props => {
  const { children } = props;
  const {walletShaders} = useWalletApiConnector();

  const [search, setSearch] = useState("");
  const [view, setView] = useState("SEARCH");
  const viewRef = useRef(view);
  
  useEffect(() => {
 
  }, []);

  const provider = {
    search,
    view,
    setSearch,
    setView
  };
  return <BansContext.Provider value={provider}>{children}</BansContext.Provider>;
};
