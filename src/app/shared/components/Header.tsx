import React, { ReactChildren } from 'react';
import { styled } from '@linaria/react';
import { css } from '@linaria/core';
import { Button } from '@app/shared/components/index';
import { IconBack } from '@app/shared/icons';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@app/shared/constants';

interface HeaderProps {
  backBtn?: boolean;
  children: React.ReactNode
}

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 50px;
    position: relative;
    max-width: 80rem;
`;
const style = css`
    display: flex !important;
    align-items: center;
    color: #fff !important;
  svg {
    margin-right: 0.3125rem;
  }

`;

const Header: React.FC<HeaderProps> = ({ children, backBtn }) => {
  const navigate = useNavigate();
  const toBack = () => {
    navigate(ROUTES.MAIN.MAIN_PAGE);
  };
  return (
    <Container>
      {backBtn ? <Button variant="link" icon={IconBack} className={style} onClick={toBack}>Back</Button> : null}
      {children}
    </Container>
  );
};

export default Header;
