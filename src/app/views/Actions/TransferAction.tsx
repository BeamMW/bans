import React from "react";
import { useTransactionFunction } from "@app/library/transaction-react/useTransactionFunction";
import Button from "@app/components/Button";
import { useBansApi, useMainView } from "@app/contexts/Bans/BansContexts";
import { DomainPresenterType } from "@app/library/bans/DomainPresenter";

type TransferActionProps = {
    transactionId: string;
    change: any;
    transferKey: string;
    domain: DomainPresenterType;
    disabled?: boolean;
};

export const TransferAction: React.FC<TransferActionProps> = ({
    children,
    transactionId,
    change,
    transferKey,
    domain,
    disabled = false
}) => {

    const { registeredMethods } = useBansApi();
    //const { foundDomain : {name: name} } = useMainView();

    const apiCall = (change) => {
        switch (change) {
            case "transferBans":
                {
                    return () => registeredMethods.userDomainSetOwner({ name: domain.name, pkOwner: transferKey });
                }
        }
    }

    const [sendTransaction] = useTransactionFunction(
        transactionId,
        apiCall(change)
    );

    return (
        <Button pallete="green" style={disabled ? {opacity: "0.2"} : {}}  onClick={!disabled ? sendTransaction : null}>
            {children}
        </Button>
    );
};
