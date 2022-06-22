import React from "react";
import { Decimal } from "@app/library/base/Decimal";
import { useTransactionFunction } from "@app/library/transaction-react/useTransactionFunction";
import { toGroths } from '@app/library/base/appUtils';
import Plus from '../../assets/icons/blue-plus.svg';
import Button from "../../components/Button";
import { useBansApi, useBansView } from "@app/contexts/Bans/BansContexts";

type TroveActionProps = {
    transactionId: string;
    change: any;
    period: number;
};

export const RegisterAction: React.FC<TroveActionProps> = ({
    children,
    transactionId,
    change,
    period
}) => {

    const { registeredMethods } = useBansApi();

    const apiCall = (change) => {
        switch (change) {
            case "registerDomain":
                {
                    const { search } = useBansView();

                    return () => registeredMethods.userDomainRegister({name: search});
                }
        }

    }

    const [sendTransaction] = useTransactionFunction(
        transactionId,
        apiCall(change)
    );

    return (
        <Button pallete="green" style={{ marginTop: '32px' }} onClick={sendTransaction}>
            {children}
        </Button>
    );
};
