import React from 'react';
import { Modal } from '@app/shared/components/Modal';
import { Input } from '@app/shared/components/index';
import { IconBeam, IconChecked, IconSendBlack } from '@app/shared/icons';
import { payDomain } from '@core/api';
import { ROUTES } from '@app/shared/constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAvailable } from '@app/containers/Main/store/selectors';
import { useNavigate } from 'react-router-dom';
import { IPayRequest } from '@app/shared/interface/RequestType';
import { getTextWidth } from '@core/appUtils';
import { actions } from '@app/containers/Main/store';
import { amountHandler } from '@core/amountHandler';
import { styled } from '@linaria/react';

export interface SendModalProps {
  isShown: boolean;
  onClose: () => void
}

const initialValues : IPayRequest = {
  domain: '',
  amount: '',
};
const Domain = styled.span<{ textWidth, isValid }>`
  display: block;
  position: absolute;
  top: 39px;
  left: ${({ textWidth }) => (textWidth === 0 ? '0px' : `${textWidth}px`)};
  color: ${({ isValid }) => (isValid ? ' rgba(255,255,255,0.5)' : 'rgba(255, 98, 92, 0.5)')};
  font-weight: 700;
  font-size: 16px;
  padding-left: 0.9375rem;
  font-family: 'SF Pro Display', sans-serif;
`;
const Box = styled.div`
margin-top: 1.875rem;
`;
const Amountlabel = styled.span`
margin-left: 10px;
margin-top: 1px;
`;
const AmountlabelContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
function SendModal({ isShown, onClose }:SendModalProps) {
  // TODO: resolve errs
  if (!isShown) return <></>;
  const isAvailable = useSelector(selectIsAvailable());
  const isValid = isAvailable === 'not available';
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = React.useState<IPayRequest>(initialValues);
  const [textWidth, setTextWidth] = React.useState(0);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const regexForDomain = /^[A-Za-z0-9]*$/;
    if (name === 'domain') {
      if (regexForDomain.test(value)) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        setTextWidth(getTextWidth(value, '16px Arial'/* 16 */));
        setValues({
          ...values,
          [name]: value.toLowerCase(),
        });
        dispatch(actions.getDomainName.request(value));
      }
    }
    if (name === 'amount') {
      console.log(value);
      amountHandler(value, (val) => setValues({
        ...values,
        [name]: val,
      }));
    }
  };

  const sendPay = () => {
    payDomain(values);
    navigate(ROUTES.MAIN.MAIN_PAGE);
  };

  return (
    <Modal isShown={isShown} onClose={onClose} actionButton={sendPay} labelAction="send" icon={IconSendBlack} header="Send funds to the BANS" subHeader="To send assets you need to choose recipient Bans' from favorites or input Bans domain">
      <>
        <Input
          variant="modalInput"
          pallete="white"
          label="Domain*"
          name="domain"
          onChange={handleChange}
          maxLength={30}
          value={values.domain}
          valid={isValid || values.domain.length === 0}
          errorMessage="Incorrect domain"
          suffix={(
            <Domain textWidth={textWidth} isValid={isValid}>
              .beam
            </Domain>
                    )}
        >
          {isValid ? <IconChecked /> : <></>}
        </Input>
        <Box sx={{ mt: '30px' }}>
          <Input
            variant="modalInput"
            pallete="purple"
            label="Amount*"
            name="amount"
            onChange={handleChange}
            value={values.amount}
            type="text"
            rate={values.amount}
            placeholder="0"
          >
            <AmountlabelContainer>
              <IconBeam />
              {' '}
              <Amountlabel>BEAM</Amountlabel>
            </AmountlabelContainer>
          </Input>
        </Box>
      </>
    </Modal>
  );
}

export default SendModal;
