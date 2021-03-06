import React from "react";
import { useTransactionFunction } from "@app/library/transaction-react/useTransactionFunction";
import Button from "@app/components/Button";
import { useBansApi, useMainView } from "@app/contexts/Bans/BansContexts";
import { DomainPresenterType } from "@app/library/bans/DomainPresenter";
import { toGroths } from "@app/library/base/appUtils";

type SendFundsActionProps = {
    transactionId: string;
    change: any;
    domain: DomainPresenterType;
    amount: number;
    disabled: boolean;
};

export const SendFundsAction: React.FC<SendFundsActionProps> = ({
    children,
    transactionId,
    change,
    domain,
    amount,
    disabled
}) => {

    const { registeredMethods } = useBansApi();
    //const { foundDomain : {name: name} } = useMainView();

    const apiCall = (change) => {
        switch (change) {
            case "sendFunds":
                {
                    return () => registeredMethods.managerPay({ name: domain.name, amount: toGroths(amount) });
                }
        }
    }

    const [sendTransaction] = useTransactionFunction(
        transactionId,
        apiCall(change)
    );

    return (
        <Button 
         pallete="green"
         style={disabled ? {opacity: "0.2"} : {}}
         onClick={!disabled ? sendTransaction : null}
         variant='custom' 
         padding="10px 24px"
         width='125px'
         borderRadius='50px'
         height='auto'
         >
            {children}
        </Button>
    );
}