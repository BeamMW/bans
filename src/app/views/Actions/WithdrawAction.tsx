import React from "react";
import { useTransactionFunction } from "@app/library/transaction-react/useTransactionFunction";
import { useBansApi, useMainView } from "@app/contexts/Bans/BansContexts";
import { DomainPresenterType } from "@app/library/bans/DomainPresenter";
import { toGroths } from "@app/library/base/appUtils";

type WithdrawActionProps = {
    transactionId: string;
    change: any;
    domain?: DomainPresenterType;
    amount?: number;
    pkKeys?: Array<string>
    disabled?: boolean;
};

export const WithdrawAction: React.FC<WithdrawActionProps> = ({
    children,
    transactionId,
    change,
    domain,
    amount = 0,
    pkKeys = [],
    disabled = false
}) => {

    const { registeredMethods } = useBansApi();
    //const { foundDomain : {name: name} } = useMainView();

    const apiCall = (change) => {
        switch (change) {
            case "withdrawAll":
                {
                    return () => registeredMethods.userReceiveAll();
                }
            case "withdrawFromDomain":
                {
                    if(!pkKeys.length) return;

                    const preparedKeys = pkKeys.reduce((map, key, index) => ({...map, [`key_${index + 1}`] : key}), {})
                    return () => registeredMethods.userReceiveList(preparedKeys);
                }
            case "withdraw":
                {
                    return () => registeredMethods.userReceive({ name: domain.name, amount: toGroths(amount) });
                }
        }

    }

    const [sendTransaction] = useTransactionFunction(
        transactionId,
        apiCall(change)
    );

    return (
        <span style={disabled ? {opacity: "0.2"} : {}}  onClick={!disabled ? sendTransaction : null}>
            {children}
        </span>
    );
}