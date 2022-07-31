import React, { useEffect, useState } from "react";
import { PageTitle } from '@app/components/PageTitle/PageTitle';
import { Balance } from '@app/components/Balance/Balance';
import { MyTransactions } from '@app/views/MyTransactions/MyTransactions';
import { useBansApi } from "@app/contexts/Bans/BansContexts";
import _ from "lodash";
import { Decimal } from "@app/library/base/Decimal";
import { GROTHS_IN_BEAM } from "@app/constants";
import { useSelector } from "react-redux";
import { selectFundsTotal } from "@app/store/BansStore/selectors";
import FadeIn from 'react-fade-in';

const Transactions: React.FC = () => {
  const total = useSelector(selectFundsTotal());

  return (
    <>
      <PageTitle title="BANS' transactions" />
      <Balance balance={total ? total.toString() : "0"} />
      <FadeIn>
        <MyTransactions />
      </FadeIn>
    </>
  );
}

export default Transactions;