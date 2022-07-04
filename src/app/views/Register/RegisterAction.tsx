import React from "react";
import { Decimal } from "@app/library/base/Decimal";
import { useTransactionFunction } from "@app/library/transaction-react/useTransactionFunction";
import { toGroths } from '@app/library/base/appUtils';
import Plus from '../../assets/icons/blue-plus.svg';
import Button from "../../components/Button";
import { useBansApi, useMainView } from "@app/contexts/Bans/BansContexts";
import { DomainPresenterType } from "@app/library/bans/DomainPresenter";

type RegisterActionProps = {
    transactionId: string;
    change: any;
    period?: number;
    domain: DomainPresenterType;
    isPure?: boolean;
};

export const RegisterAction: React.FC<RegisterActionProps> = ({
    children,
    transactionId,
    change,
    period,
    domain,
    isPure = false
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
        !isPure ?
            (
                <Button pallete="green" onClick={sendTransaction} >
                    {children}
                </Button >
            ) : (
                <span onClick={sendTransaction}>
                    {children}
                </span>
            )
    );
}