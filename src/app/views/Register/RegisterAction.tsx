import React from "react";
import { Decimal } from "@app/library/base/Decimal";
import { useTransactionFunction } from "@app/library/transaction-react/useTransactionFunction";
import { toGroths } from '@app/library/base/appUtils';
import Plus from '../../assets/icons/blue-plus.svg';
import Button from "../../components/Button";
import { useBansApi, useMainView } from "@app/contexts/Bans/BansContexts";
import { DomainPresenterType } from "@app/library/bans/DomainPresenter";

type TroveActionProps = {
    transactionId: string;
    change: any;
    period: number;
    domain: DomainPresenterType;
};

export const RegisterAction: React.FC<TroveActionProps> = ({
    children,
    transactionId,
    change,
    period,
    domain
}) => {

    const { registeredMethods } = useBansApi();
    //const { foundDomain : {name: name} } = useMainView();

    const apiCall = (change) => {
        switch (change) {
            case "registerDomain":
                {
                    return () => registeredMethods.userDomainRegister({ name: domain.name, nPeriods: period });
                }
            case "renewDomainExpiration":
                {
                    return () => registeredMethods.userDomainExtend({ name: domain.name, nPeriods: period });
                }
            case "buyDomain":
                {
                    return () => registeredMethods.userDomainBuy({ name: domain.name });
                }
        }

    }

    const [sendTransaction] = useTransactionFunction(
        transactionId,
        apiCall(change)
    );

    return (
        <Button pallete="green" onClick={sendTransaction}>
            {children}
        </Button>
    );
};
