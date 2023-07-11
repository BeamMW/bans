import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ROUTES_PATH } from '@app/shared/constants';
import {
  MainPage,
} from '@app/containers/Main/containers';
import RegPage from '@app/containers/Main/containers/RegPage/RegPage';

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
  },
];

const MainContainer = () => {
  const content = useRoutes(routes);

  return <>{content}</>;
};

export default MainContainer;
