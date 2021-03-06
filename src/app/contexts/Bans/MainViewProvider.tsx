import { DomainPresenterType, getDomainPresentedData, RawDomainType } from "@app/library/bans/DomainPresenter";
import methods from "@app/library/bans/methods";
import ShaderApi from "@app/library/base/api/ShaderApi";
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
  },
  MYBANS: {
    REGISTER_FAVORITES_DOMAIN: "MYBANS_REGISTER",
  },
  MYBANS_REGISTER: {
    REGISTER_CLOSED: "MYBANS",
    REGISTER_COMPLETED: "MYBANS",
  },
}

export const MainViewProvider: React.FC = props => {
  const { children } = props;
  const location = useLocation();

  const [foundDomain, _setFoundDomain] = useState<DomainPresenterType | null>(null);

  const [view, setView] = useState("SEARCH");
  const viewRef = useRef(view);

  const setCurrentView = useCallback((event: any /* BansEvent */) => {
    let nextView = bansStates[viewRef.current][event] ?? view;

    setView(nextView);
  }, []);

  const setFoundDomain = (rawData, currentStateTimestamp, currentStateHeight, publicKey) => {
    //const memo = useMemo(() => getDomainPresentedData(rawData), [rawData]); 
    _setFoundDomain(
      //@TODO: refactor this mess!
      !!rawData && /* (rawData as DomainPresenterType) */ 'searchName' in rawData ?
        getDomainPresentedData(rawData, currentStateTimestamp, currentStateHeight, publicKey) :
        (!!rawData && /* rawData as DomainPresenterType */ !('searchName' in rawData))  ? rawData : null
    )
  };

  useEffect(() => {
    viewRef.current = view;
  }, [view]);


  useEffect(() => {
    location.pathname == "/" && setView("SEARCH");
    location.pathname == "/my-page" && setView("MYBANS");
  }, [location])

  const provider = {
    view,
    setCurrentView,
    foundDomain,
    setFoundDomain
  };
  return <MainContext.Provider value={provider}>{children}</MainContext.Provider>;
};
