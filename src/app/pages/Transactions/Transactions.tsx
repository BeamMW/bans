import React from "react";
import { PageTitle } from '../../components/PageTitle/PageTitle';
import { Balance } from '../../components/Balance/Balance';
import { MyBans } from './../../views/MyBans/MyBans';

const Transactions: React.FC = () => {

  return (
    <>
      <PageTitle title="BANS' transactions"/>
      <Balance balance="200"/>
      <MyBans/>
    </>
  );
}

export default Transactions;