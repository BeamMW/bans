import { BANS_CID } from "@app/constants";
import { getGlobalApiProviderValue } from "@app/contexts/Bans/BansApiProvider";
import { useBansApi } from "@app/contexts/Bans/BansContexts";
import { DomainPresenterType, getDomainPresentedData } from "@app/library/bans/DomainPresenter";
import methods from "@app/library/bans/methods";
import ShaderApi from "@app/library/base/api/ShaderApi";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useConvertToDomainPresenter } from "./useConvertToDomainPresenter";
import { useSearchValidator } from "./useSearchValidator";
import _ from "lodash";
import { useSelector } from "react-redux";
import { selectSystemState } from "@app/store/SharedStore/selectors";
import { getBansApi } from "@app/utils/getBansApi";
import { selectPublicKey } from "@app/store/BansStore/selectors";

export const useFetchDomainAndConvert = async (search): Promise<DomainPresenterType> => {
  const [prepare, setPrepare] = useState(null);

  const searchValidator = useSearchValidator(search);

  const registeredMethods = getBansApi();

  const publicKey = useSelector(selectPublicKey());

  const {
    current_height: currentStateHeight,
    current_state_timestamp: currentStateTimestamp
  } = useSelector(selectSystemState());

  useEffect(() => {
    if (!searchValidator) {
      setPrepare(null);
      return;
    }

    registeredMethods.managerViewName({ name: search }).then(response => {
      if (Object.keys(response).length !== 0 && response.res?.error) {
        return response.error /* && setIsValid(true) */;
      }

      Object.keys(response).length !== 0 && response?.hExpire && setPrepare(
        getDomainPresentedData(
          { ...response, ...{ searchName: search } },
          currentStateTimestamp,
          currentStateHeight,
          publicKey
        )
      );

      Object.keys(response).length === 0 && setPrepare(
        getDomainPresentedData(
          { searchName: search, isAvailable: true },
          currentStateTimestamp,
          currentStateHeight,
          publicKey
        )
      );

    });
  }, [search])


  return prepare;;
}