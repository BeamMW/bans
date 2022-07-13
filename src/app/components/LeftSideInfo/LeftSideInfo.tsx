import { useIsBansFavorite } from "@app/hooks/useIsBansFavorite";
import { DomainPresenterType } from "@app/library/bans/DomainPresenter";
import React from "react";
import styled from 'styled-components';
import { Box, Flex, Text } from "theme-ui";
import Button from "../Button";
import { copyToClipboard } from '../../core/appUtils';
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
};

export const LeftSide: React.FC<LeftSideProps> = ({ domain, showBelonging = true }) => {
  const { name, expiresAt, isExpired, isOnSale } = domain;

  return (
    <Flex sx={{ variant: 'layout.card', flexDirection: 'row' }}>

      {isOnSale ?
        <Flex sx={{ marginRight: '20px', alignItems: 'center' }}>
          <SaleIcon />
        </Flex> : <></>
      }

        <Box>
          <Text>{name}.beam</Text>
          <Button variant='icon' pallete='transparent' onClick={() => copyToClipboard(domain.name)}>
            <Copy />
          </Button>

        <Flex>
          {expiresAt ? 
          <>
          <SubText isexpired={isExpired.toString()}>Expires on {expiresAt}</SubText>
          <Text sx={{ color: domain.isAvailable || domain.isYourOwn ? "#00F6D2" : "#FF746B", padding: '4px 0px 0px 20px' }}>{
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
                          "on sale" :
                          "not available"
                      )
                  )
              )
          } 
           </Text>
          </>
          : (
            <Text sx={{ color: domain.isAvailable || domain.isYourOwn ? "#00F6D2" : "#FF746B" }}>{
              domain.isYourOwn ?
                "your already own" :
                (
                  domain.isAvailable && !domain.isOnSale ?
                    "available" :
                    (
                      domain.isOnSale ?
                        "on sale" :
                        "not available"
                    )
                )
            } 
             </Text>
          )
          }
        </Flex>
        </Box>
    </Flex>
  )
}