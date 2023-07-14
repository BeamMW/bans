import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ROUTES_PATH } from '@app/shared/constants';
import {
  DomainPage, FaqPage, MainPage, RegPage, TransactionPage,
} from '@app/containers/Main/containers';

const routes = [
  {
    path: ROUTES_PATH.MAIN.MAIN_PAGE,
    element: <MainPage />,
    exact: true,
  },
  {
    path: ROUTES_PATH.MAIN.REG_PAGE,
    element: <RegPage />,
    exact: true,
  }, {
    path: ROUTES_PATH.MAIN.DOMAIN_PAGE,
    element: <DomainPage />,
    exact: true,
  }, {
    path: ROUTES_PATH.MAIN.TRANSACTION_PAGE,
    element: <TransactionPage />,
    exact: true,
  }, {
    path: ROUTES_PATH.MAIN.FAQ_PAGE,
    element: <FaqPage />,
    exact: true,
  },
];

function MainContainer() {
  const content = useRoutes(routes);

  return <>{content}</>;
}

export default MainContainer;
