import React from "react";
import { useTransactionFunction } from "@app/library/transaction-react/useTransactionFunction";
import Button from "@app/components/Button";
import { useBansApi, useMainView } from "@app/contexts/Bans/BansContexts";
import { DomainPresenterType } from "@app/library/bans/DomainPresenter";

type RegisterActionProps = {
    transactionId: string;
    change: any;
    period?: number;
    domain: DomainPresenterType;
    isPure?: boolean;
    disabled?: boolean;
};

export const RegisterAction: React.FC<RegisterActionProps> = ({
    children,
    transactionId,
    change,
    period,
    domain,
    isPure = false,
    disabled
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
                <Button pallete="green" style={disabled ? {opacity: "0.2"} : {}}  onClick={!disabled ? sendTransaction : null} >
                    {children}
                </Button >
            ) : (
                <span style={disabled ? {opacity: "0.2"} : {}}  onClick={!disabled ? sendTransaction : null}>
                    {children}
                </span>
            )
    );
}