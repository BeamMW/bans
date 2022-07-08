import React, { useEffect, useState } from "react";
import { PageTitle } from '../../components/PageTitle/PageTitle';
import { Balance } from '../../components/Balance/Balance';
import { MyBans } from './../../views/MyBans/MyBans';
import { useBansApi } from "@app/contexts/Bans/BansContexts";
import _ from "lodash";
import { Decimal } from "@app/library/base/Decimal";
import { GROTHS_IN_BEAM } from "@app/constants";
import { useSelector } from "react-redux";
import { selectFundsTotal } from "@app/store/BansStore/selectors";

const Transactions: React.FC = () => {
  const { registeredMethods } = useBansApi();
  const total = useSelector(selectFundsTotal());

  return (
    <>
      <PageTitle title="BANS' transactions"/>
      <Balance balance={total ? total.toString() : "0"} />
      <MyBans/>
    </>
  );
}

export default Transactions;