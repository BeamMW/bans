import { getDomainPresentedData, RawDomainType } from "@app/library/bans/DomainPresenter";
import methods from "@app/library/bans/methods";
import ShaderApi from "@app/library/base/api/ShaderApi";
import { useWalletApiConnector } from "@app/library/wallet-react/context/WalletApiConnector/WalletApiConnectorContext";
import React, { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { MainContext } from "./BansContexts";

const bansStates = {
  SEARCH: {
    REGISTER_DOMAIN: "REGISTER",
  },
  REGISTER: {
    REGISTER_CLOSED: "SEARCH",
    REGISTER_COMPLETED: "SEARCH",
  }
}

export const MainViewProvider: React.FC = props => {
  const { children } = props;

  const [foundDomain, _setFoundDomain] = useState(null);
  
  const [view, setView] = useState("SEARCH");
  const viewRef = useRef(view);
  
  const setCurrentView = useCallback((event: any /* BansEvent */) => {
    const nextView = bansStates[viewRef.current][event] ?? view;

    setView(nextView);
  }, []);
  
  const setFoundDomain = (rawData) => {
    //const memo = useMemo(() => getDomainPresentedData(rawData), [rawData]); 
    _setFoundDomain(
      getDomainPresentedData(rawData)
    )
  };


  useEffect(() => {
    viewRef.current = view;
  }, [view]);

  const provider = {
    view,
    setCurrentView,
    foundDomain,
    setFoundDomain
  };
  return <MainContext.Provider value={provider}>{children}</MainContext.Provider>;
};