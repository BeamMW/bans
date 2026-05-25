import { DomainPresenterType, getDomainPresentedData, mergeShaderResIntoRawDomain } from "@app/library/bans/DomainPresenter";
import { fetchWalletChainClock, needsChainHeight } from "@app/library/wallet/fetchWalletChainClock";
import { setSystemState } from "@app/store/SharedStore/actions";
import { useEffect, useState } from "react";
import { useSearchValidator } from "./useSearchValidator";
import { useDispatch, useSelector } from "react-redux";
import { selectSystemState } from "@app/store/SharedStore/selectors";
import { getBansApi } from "@app/utils/getBansApi";
import { selectPublicKey } from "@app/store/BansStore/selectors";

export const useFetchDomainAndConvert = (search): DomainPresenterType | null => {
  const [prepare, setPrepare] = useState<DomainPresenterType | null>(null);

  const searchValidator = useSearchValidator(search);
  const dispatch = useDispatch();

  const registeredMethods = getBansApi();

  const publicKey = useSelector(selectPublicKey);

  const {
    current_height: currentStateHeight,
    current_state_timestamp: currentStateTimestamp,
    tip_height: tipHeight,
    tip_state_timestamp: tipTimestamp,
  } = useSelector(selectSystemState);

  useEffect(() => {
    if (!searchValidator) {
      setPrepare(null);
      return;
    }

    let cancelled = false;

    (async () => {
      let ch = currentStateHeight;
      let cts = currentStateTimestamp;
      let th = tipHeight;
      let tts = tipTimestamp;

      if (needsChainHeight(ch, th)) {
        const ws = await fetchWalletChainClock();
        if (!cancelled && ws) {
          dispatch(setSystemState(ws));
          ch = ws.current_height || ch;
          cts = ws.current_state_timestamp || cts;
          th = ws.tip_height || th;
          tts = ws.tip_state_timestamp || tts;
        }
      }

      const hint = { tip_height: th, tip_state_timestamp: tts };

      try {
        const response = await registeredMethods.managerViewName({ name: search });
        if (cancelled) return;

        if (response?.error) {
          return;
        }

        if (Object.keys(response).length !== 0 && response.res?.error) {
          return;
        }

        const flat = mergeShaderResIntoRawDomain({ ...response, searchName: search });

        if (Object.keys(response).length !== 0 && flat.hExpire != null && flat.hExpire !== '') {
          setPrepare(
            getDomainPresentedData(flat, cts, ch, publicKey, hint),
          );
        } else if (Object.keys(response).length === 0) {
          setPrepare(
            getDomainPresentedData(
              { searchName: search, isAvailable: true },
              cts,
              ch,
              publicKey,
              hint,
            ),
          );
        }
      } catch {
        if (!cancelled) setPrepare(null);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [search, searchValidator, currentStateHeight, currentStateTimestamp, publicKey, tipHeight, tipTimestamp, dispatch])


  return prepare;
};