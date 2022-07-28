import React, { useEffect } from 'react';


import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './styles';
import { WalletApiConnector } from './components/WalletApiConnector';
import { ThemeProvider } from '@theme-ui/core';
import theme from '@app/theme';
import { RouterLink } from '@app/components/RouterLink';
import { TransactionProvider } from '@app/library/transaction-react/context/TransactionProvider';
import { TransactionMonitor } from './library/transaction-react/TransactionMonitor';


import { BansLayout } from './components/BansLayout/BansLayout';
import Main from './pages/Main/Main';
import Faq from './pages/Faq/Faq';
import MyPage from './pages/MyPage/MyPage';
import Transactions from './pages/Transactions/Transactions';
import './styles.css';
import { BansApiProvider } from './contexts/Bans/BansApiProvider';
import { MainViewProvider } from './contexts/Bans/MainViewProvider';
import { ModalProvider } from './contexts/Modal/ModalProvider';
import { Register } from '@app/views/Register/Register';

const App = () => {

  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <WalletApiConnector>
        <BansApiProvider>
          <MainViewProvider>
            <TransactionProvider>
              <ModalProvider>
                <BansLayout>
                  <Routes>
                    <Route index element={<Main />} />
                    <Route path="/" element={<Main />} />
                    <Route path="faq" element={<Faq />} />
                    <Route path="my-page" element={<MyPage />} />
                    <Route path="transactions" element={<Transactions />} />
                    <Route path="register" element={<Register />} />
                  </Routes>
                </BansLayout>
              </ModalProvider>
              <TransactionMonitor transactions={[]} showStatusBlock={false} />
            </TransactionProvider>
          </MainViewProvider>
        </BansApiProvider>
      </WalletApiConnector>
    </ThemeProvider>
  );
};

export default App;

