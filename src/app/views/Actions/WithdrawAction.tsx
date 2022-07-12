import React from "react";
import { useTransactionFunction } from "@app/library/transaction-react/useTransactionFunction";
import Button from "@app/components/Button";
import { useBansApi, useMainView } from "@app/contexts/Bans/BansContexts";
import { DomainPresenterType } from "@app/library/bans/DomainPresenter";
import { toGroths } from "@app/library/base/appUtils";

type WithdrawActionProps = {
    transactionId: string;
    change: any;
    domain?: DomainPresenterType;
    amount?: number;
};

export const WithdrawAction: React.FC<WithdrawActionProps> = ({
    children,
    transactionId,
    change,
    domain,
    amount
}) => {

    const { registeredMethods } = useBansApi();
    //const { foundDomain : {name: name} } = useMainView();

    const apiCall = (change) => {
        switch (change) {
            case "withdrawAll":
                {
                    return () => registeredMethods.userReceiveAll();
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
        <span onClick={sendTransaction}>
            {children}
        </span>
    );
}