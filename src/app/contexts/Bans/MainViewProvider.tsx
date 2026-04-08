import { DomainPresenterType, getDomainPresentedData, RawDomainType } from "@app/library/bans/DomainPresenter";
import methods from "@app/library/bans/methods";
import ShaderApi from "@app/library/base/api/ShaderApi";
import React, { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { MainContext } from "./BansContexts";
import { selectPublicKey } from "@app/store/BansStore/selectors";
import { selectSystemState } from "@app/store/SharedStore/selectors";

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

  const systemState = useSelector(selectSystemState);
  const storePublicKey = useSelector(selectPublicKey);

  const [foundDomain, _setFoundDomain] = useState<DomainPresenterType | null>(null);

  const [view, setView] = useState("SEARCH");
  const viewRef = useRef(view);

  const setCurrentView = useCallback((event: any /* BansEvent */) => {
    let nextView = bansStates[viewRef.current][event] ?? view;

    setView(nextView);
  }, []);

  const setFoundDomain = useCallback((rawData, currentStateTimestamp?, currentStateHeight?, publicKey?) => {
    const ts = currentStateTimestamp ?? systemState.current_state_timestamp;
    const h = currentStateHeight ?? systemState.current_height;
    const pk = publicKey ?? storePublicKey;
    const systemClockHint = {
      tip_height: systemState.tip_height,
      tip_state_timestamp: systemState.tip_state_timestamp,
    };
    _setFoundDomain(
      //@TODO: refactor this mess!
      !!rawData && /* (rawData as DomainPresenterType) */ 'searchName' in rawData ?
        getDomainPresentedData(rawData as RawDomainType, ts, h, pk, systemClockHint) :
        (!!rawData && /* rawData as DomainPresenterType */ !('searchName' in rawData)) ? rawData : null
    );
  }, [systemState, storePublicKey]);

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
