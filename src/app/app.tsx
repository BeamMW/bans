import React from 'react';


import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './styles';
import { WalletApiConnector } from './components/WalletApiConnector';
import { ThemeProvider } from '@theme-ui/core';
import theme from '@app/theme';
import { Loader } from '@app/components/BeamLoader';
import { Version } from '@app/pages/Version';
import Window from '@app/components/Window';
import { Container } from 'theme-ui';
import { RouterLink } from '@app/components/RouterLink';
import { TransactionProvider } from '@app/library/transaction-react/context/TransactionProvider';
import { TransactionMonitor } from './library/transaction-react/TransactionMonitor';


import { BansLayout } from './components/BansLayout/BansLayout';
import Main from './pages/Main/Main';
import About from './pages/About/About';
import Faq from './pages/Faq/Faq';
import MyPage from './pages/MyPage/MyPage';
import Transactions from './pages/Transactions/Transactions';
import './styles.css';
import { BansApiProvider } from './contexts/Bans/BansApiProvider';
import { MainViewProvider } from './contexts/Bans/MainViewProvider';

const App = () => {
  const navigate = useNavigate();

  const loader = Loader;

  return (
    <ThemeProvider theme={theme}>
      <WalletApiConnector>
        <BansApiProvider>
          <MainViewProvider>
            <TransactionProvider>
              <BansLayout>
                <Routes>
                  <Route index element={<Main />} />
                  <Route path="/" element={<Main />} />
                  <Route path="about" element={<About />} />
                  <Route path="faq" element={<Faq />} />
                  <Route path="my-page" element={<MyPage />} />
                  <Route path="transactions" element={<Transactions />} />
                </Routes>
              </BansLayout>
              <TransactionMonitor transactions={[]} />
            </TransactionProvider>
          </MainViewProvider>
        </BansApiProvider>
      </WalletApiConnector>
    </ThemeProvider>
  );
};

export default App;
