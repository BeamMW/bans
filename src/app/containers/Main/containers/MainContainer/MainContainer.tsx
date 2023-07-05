import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ROUTES_PATH } from '@app/shared/constants';
import {
  MainPage,
} from '@app/containers/Main/containers';

const routes = [
  {
    path: ROUTES_PATH.MAIN.MAIN_PAGE,
    element: <MainPage />,
    exact: true,
  },
];

const MainContainer = () => {
  const content = useRoutes(routes);

  return <>{content}</>;
};

export default MainContainer;
