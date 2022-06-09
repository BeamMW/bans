import React from 'react';


import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './styles';
import { WalletApiConnector } from './components/WalletApiConnector';
import { ThemeProvider } from '@theme-ui/core';
import theme from '@app/theme';
import { Loader } from '@app/components/BeamLoader';
import { Version } from '@app/pages/Version';
import { Window } from '@app/components';
import { Container } from 'theme-ui';
import { RouterLink } from '@app/components/RouterLink';
import { TransactionProvider } from '@app/library/transaction-react/context/TransactionProvider';
import { TransactionMonitor } from './library/transaction-react/TransactionMonitor';

const App = () => {
  const navigate = useNavigate();

  const loader = Loader;

  return (
    <ThemeProvider theme={theme}>
      <WalletApiConnector>
        {/* <BansProvider loader={loader}> */}
          <TransactionProvider>
            <Window>

              {/* Temp */}
              {/* <Container>
                <RouterLink sx={{ "color": "#fff", "border": "1px solid #fff", p: "2px 4px" }} to="/">BANS</RouterLink> {" "}
                <RouterLink sx={{ "color": "#fff", "border": "1px solid #fff", p: "2px 4px" }} to="/version">Version</RouterLink>
              </Container> */}
              {/* Temp */}

              {/* <BansLayout> */}
                <Routes>
                  <Route path="/version" element={<Version />} />
                </Routes>
              {/* </BansLayout> */}
            </Window>
            <TransactionMonitor /* transactions={transactions} */ />
          </TransactionProvider>
        {/* </BansProvider> */}
      </WalletApiConnector>
    </ThemeProvider>
  );
};

export default App;
