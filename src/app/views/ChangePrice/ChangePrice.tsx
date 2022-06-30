import React from "react";
import { Box,Text } from "theme-ui";
import Button from "@app/components/Button";
import { ButtonContainer } from "@app/components/ButtonsContainer/ButtonContainer";
import { CloseBtn } from "@app/components/CloseBtn/CloseBtn";
import { Modal } from "@app/components/Modals/Modal";
import ArrowRight from '../../assets/icons/arrow-right.svg'
import { Amount } from "@app/components/Amount/Amount";
import Input from "@app/components/Input";


interface ChangePriceProps {
  isShown: boolean;
  toggleClose: () => void;
}

export const ChangePrice: React.FC<ChangePriceProps> = ({ isShown, toggleClose }) => {
  const [amount, setAmount] = React.useState();

  const handlePriceChange = (e) => {
    setAmount(e.target.value)
  } 
  return (
    <Modal  isShown={isShown} header="Change price for batboy.beam domain">
      <>
      <Box sx={{mb: '10px'}}>
        <Text variant="subHeader">Current price</Text>
      </Box>
      <Box>
      <Amount value="200" size="14px"  showConvertedToUsd={true}/>
      </Box>
      <Box sx={{ mt: '30px' }}>
          <Input
            variant='sell'
            pallete='blue'
            label='New price'
            onChange={handlePriceChange}
            value={amount}
            info="0 USD"
          >
          <Amount value={amount} size="14px" />
          </Input>
        </Box>
      <ButtonContainer>
          <CloseBtn toggle={toggleClose}/>
          <Button pallete="green" onClick={() => {}} style={{ fontSize: '14px' }}>
            <ArrowRight />
            Transfer
          </Button>
      </ButtonContainer>
      </>
    </Modal>
  )
}