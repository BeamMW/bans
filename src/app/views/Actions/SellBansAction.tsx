import React from "react";
import { useTransactionFunction } from "@app/library/transaction-react/useTransactionFunction";
import { toGroths } from '@app/library/base/appUtils';
import Button from "../../components/Button";
import { useBansApi, useMainView } from "@app/contexts/Bans/BansContexts";
import { DomainPresenterType } from "@app/library/bans/DomainPresenter";

type SellBansActionProps = {
    transactionId: string;
    change: any;
    amount?: number;
    domain: DomainPresenterType;
    disabled: boolean;
};

export const SellBansAction: React.FC<SellBansActionProps> = ({
    children,
    transactionId,
    change,
    amount,
    domain,
    disabled = false
}) => {

    const { registeredMethods } = useBansApi();
    //const { foundDomain : {name: name} } = useMainView();

    const apiCall = (change) => {
        switch (change) {
            case "sellBans":
            case "adjustSellingBans":
                {
                    return () => registeredMethods.userDomainSetPrice({ name: domain.name, amount: toGroths(amount) });
                }
            case "removeBansFromSale":
                {
                    return () => registeredMethods.userDomainSetPrice({ name: domain.name, amount: 0 });
                }
                
        }
    }

    const [sendTransaction] = useTransactionFunction(
        transactionId,
        apiCall(change)
    );

    return (
        <Button pallete="green" style={disabled ? {opacity: "0.2"} : {}} onClick={!disabled ? sendTransaction : null}>
            {children}
        </Button>
    );
};
