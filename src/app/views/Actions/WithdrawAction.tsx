import React from "react";
import { useTransactionFunction } from "@app/library/transaction-react/useTransactionFunction";
import { useBansApi } from "@app/contexts/Bans/BansContexts";
import { DomainPresenterType } from "@app/library/bans/DomainPresenter";
import { toGroths } from "@app/library/base/appUtils";

export type ReceiveListEntry = { pk: string; aid: number };

type WithdrawActionProps = {
    transactionId: string;
    change: any;
    domain?: DomainPresenterType;
    amount?: number;
    /** Pairs for receive_list: key_N + aid_N per vault output (BEAM is aid 0). */
    receiveListEntries?: ReceiveListEntry[];
    disabled?: boolean;
};

export const WithdrawAction: React.FC<WithdrawActionProps> = ({
    children,
    transactionId,
    change,
    domain,
    amount = 0,
    receiveListEntries = [],
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
                    if (!receiveListEntries.length) return;

                    const prepared = receiveListEntries.reduce(
                        (acc, { pk, aid }, index) => {
                            const n = index + 1;
                            acc[`key_${n}`] = pk;
                            acc[`aid_${n}`] = aid;
                            return acc;
                        },
                        {} as Record<string, string | number>
                    );
                    return () => registeredMethods.userReceiveList(prepared);
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