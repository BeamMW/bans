import React, { useCallback } from 'react';
import { styled } from '@linaria/react';
import { IconMinus, IconPlus } from '@app/shared/icons';
import { Button } from '@app/shared/components/index';
import { css } from '@linaria/core';

interface PeriodProps {
  period: number;
  setPeriod: (period: number) => void;
}

// const iconStyle = {
//   cursor: 'pointer',
// };

const Container = styled.div`
display: flex;
 align-items: center   `;
const Text = styled.span`
    margin-left: 12px;
`;

const iconStyle = css`
margin: 0;
`;

const RegistrationPeriod: React.FC<PeriodProps> = ({ period, setPeriod }) => {
  const periodIncrease = useCallback(() => period < 50 && setPeriod(period + 1), [period]);
  const periodDecrease = useCallback(() => period > 1 && setPeriod(period - 1), [period]);

  return (
    <Container>
      {/* TODO: Shade */}
      <Button variant="icon" icon={IconMinus} onClick={periodDecrease} className={iconStyle} disabled={period <= 1} />
      <Text>
        {period}
        {' '}
        {period === 1 ? 'year' : 'years'}
      </Text>
      <Button variant="icon" icon={IconPlus} onClick={periodIncrease} className={iconStyle} disabled={period >= 50} />
    </Container>
  );
};
export default RegistrationPeriod;
