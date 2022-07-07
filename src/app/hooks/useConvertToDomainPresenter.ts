import { DomainPresenterType, getDomainPresentedData } from "@app/library/bans/DomainPresenter";
import { selectPublicKey, selectSystemState } from "@app/store/SharedStore/selectors";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

export const useConvertToDomainPresenter = () => useCallback((rawDomain) => {
    const [domain, setDomain] = useState<DomainPresenterType>(null);

    const publicKey = useSelector(selectPublicKey());

    const {
        current_height: currentStateHeight,
        current_state_timestamp: currentStateTimestamp
    } = useSelector(selectSystemState());

    useEffect(() => {
        if (rawDomain?.searchName || rawDomain?.name) throw new Error("Passed object should contain a name field!");

        const data = { ...rawDomain, ...{ searchName: rawDomain?.searchName ?? rawDomain.name } };
    

        setDomain(useMemo(() => getDomainPresentedData(
            data,
            currentStateTimestamp,
            currentStateHeight,
            publicKey
        ), [rawDomain]))
    }, [rawDomain])


    return domain;
}, []);