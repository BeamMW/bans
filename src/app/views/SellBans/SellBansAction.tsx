import React from "react";
import { useTransactionFunction } from "@app/library/transaction-react/useTransactionFunction";
import { toGroths } from '@app/library/base/appUtils';
import Button from "../../components/Button";
import { useBansApi, useMainView } from "@app/contexts/Bans/BansContexts";
import { DomainPresenterType } from "@app/library/bans/DomainPresenter";
import { GROTHS_IN_BEAM } from "@app/constants";

type SellBansActionProps = {
    transactionId: string;
    change: any;
    amount: number;
    domain: DomainPresenterType;
};

export const SellBansAction: React.FC<SellBansActionProps> = ({
    children,
    transactionId,
    change,
    amount,
    domain
}) => {

    const { registeredMethods } = useBansApi();
    //const { foundDomain : {name: name} } = useMainView();

    const apiCall = (change) => {
        switch (change) {
            case "sellBans":
                {
                    return () => registeredMethods.userDomainSetPrice({ name: domain.name, amount: amount * GROTHS_IN_BEAM });
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
