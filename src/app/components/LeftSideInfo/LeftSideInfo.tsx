import { useIsBansFavorite } from "@app/hooks/useIsBansFavorite";
import { DomainPresenterType } from "@app/library/bans/DomainPresenter";
import React from "react";
import styled from 'styled-components';
import { Box, Flex, Paragraph, Text } from "theme-ui";
import Button from "../Button";
import { copyToClipboard } from "@app/library/base/appUtils";
import SaleIcon from '@app/assets/icons/sell.svg';
import Copy from '@app/assets/icons/copy.svg';


interface SubTextProps {
  isexpired: boolean;
}
export const SubText = styled(Text) <SubTextProps>`
  font-family: 'SFProDisplay';
  font-style: italic;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: ${({ isExpired }) => isExpired ? '#FF746B' : 'rgba(255, 255, 255, 0.5)'};
  display: block;
  padding-top: 6px;
  white-space: nowrap;
`
interface LeftSideProps {
  domain: DomainPresenterType;
  showBelonging?: boolean;
  showSaleIcon?: boolean;
};

export const LeftSide: React.FC<LeftSideProps> = ({ domain, showSaleIcon = true, showBelonging = true }) => {
  const { name, expiresAt, isExpired, isOnSale } = domain;

  return (
    <Flex sx={{ variant: 'layout.card', flexDirection: 'row' }}>

      {/* {showSaleIcon && isOnSale ?
        <Flex sx={{ marginRight: '20px', alignItems: 'center' }}>
          <SaleIcon />
        </Flex> : <></>
      } */}

      <Box>
        <Flex sx={{alignItems: 'flex-end'}}>
          <Paragraph sx={{
            fontSize: '16px',
            fontFamily: 'SFProDisplay',
            fontWeight: 700,
            lineHeight: '19px',
          }}>
            {name}
            <Text sx={{color: 'rgba(255,255,255,0.5)'}}>.beam</Text>
            </Paragraph>
          <Box sx={{ marginLeft: '14px', position: 'relative', zIndex: 999 }}>
            <Button variant='icon' width="auto" height="auto" pallete='transparent' onClick={(event) => { copyToClipboard(domain.name); event.stopPropagation(); }}>
              <Copy />
            </Button>
          </Box>
        </Flex>
        <Flex sx={{ alignItems: 'baseline' }}>
          {expiresAt  && !isOnSale ? 
          <SubText 
            isexpired={isExpired.toString()} 
          >Expires on {expiresAt}</SubText> : 
          <SubText 
            isexpired={isExpired.toString()} 
          >This name is on sale.</SubText>
           }
              {
                showBelonging && <Text sx={{
                   color: domain.isAvailable || domain.isYourOwn ? "#00F6D2" : "#FF746B",
                   fontStyle: domain.isAvailable || domain.isYourOwn ? "normal" : "italic", 
                   padding: expiresAt ? '4px 0px 0px 20px' :'0px' }}>
                  {
                    domain.isYourOwn ?
                      "your already own" :
                      (
                        domain.isAvailable && !domain.isOnSale ?
                          "available" :
                          (
                            domain.isAvailable && !domain.isOnSale ?
                              "available" :
                              (
                                domain.isOnSale ?
                                  "available" :
                                  "not available"
                              )
                          )
                      )
                  }
                </Text>
              }
              {
                showBelonging && domain.isOnSale && (
                  <Box sx={{
                    background: ' rgba(0, 246, 210, 0.2)',
                    borderRadius: '4px',
                    marginLeft: '14px',
                    padding: '2px 6px 2px 6px'
                  }}>
                    <Text sx={{
                      color: 'rgba(0, 246, 210, 1)',
                      fontSize: '12px',
                      fontStyle: 'italic',
                    }}>on sale</Text>
                  </Box>
                )
              }
        </Flex>
      </Box>
    </Flex>
  )
}