import { selectRate } from "@app/store/BansStore/selectors";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Decimal } from "@app/library/base/Decimal";
import _ from 'lodash';
import BeamDappConnector from "@core/BeamDappConnector.js";

const useCalculateDomainPrice = (domainName: string) => {
    const beamPrice = useSelector(selectRate);

    return useMemo((): number => {
        const domainNameLength = domainName.length;

        if (!domainNameLength || domainNameLength < 3) return 0;

        if (domainNameLength === 3) {
            return _.round(BeamDappConnector.beamToGroth(Decimal.from(320).div(beamPrice).toString()), 2);
        }

        if (domainNameLength === 4) {
            return _.round(BeamDappConnector.beamToGroth(Decimal.from(120).div(beamPrice).toString()), 2);
        }

        if (domainNameLength >= 5) {
            return _.round(BeamDappConnector.beamToGroth(Decimal.from(10).div(beamPrice).toString()), 2);
        }

    }, [domainName, beamPrice])
}


export default useCalculateDomainPrice;