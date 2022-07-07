import React, { useEffect, useState } from "react";
import { PageTitle } from '../../components/PageTitle/PageTitle';
import { Balance } from '../../components/Balance/Balance';
import { MyBans } from './../../views/MyBans/MyBans';
import { useBansApi } from "@app/contexts/Bans/BansContexts";
import _ from "lodash";
import { Decimal } from "@app/library/base/Decimal";
import { GROTHS_IN_BEAM } from "@app/constants";

const Transactions: React.FC = () => {
  const [total, setTotal] = useState<Decimal>(null);

  const { registeredMethods } = useBansApi();

  useEffect(() => {
    registeredMethods.userView().then(response => {
      
      const total = [...response.raw, ...response.anon].reduce(
        (acc, current) => acc.add(current.amount)
      , Decimal.from(0))

      setTotal(total.div(GROTHS_IN_BEAM));
    });

  }, []);

  return (
    <>
      <PageTitle title="BANS' transactions"/>
      <Balance balance={total ? total.toString() : 0} />
      <MyBans/>
    </>
  );
}

export default Transactions;