import { ThemeUICSSObject, Text } from "theme-ui"; 
import styled from "styled-components";

export const SubText = styled(Text)`
  font-family: 'SFProDisplay';
  font-style: italic;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: rgba(255, 255, 255, 0.5);
  display: block;
  padding-top: 6px;
`

export interface SearchResultStyleProps {
  isAvailable: boolean;
  isValid?: boolean;
}

export const styles = ({ isAvailable }: SearchResultStyleProps): ThemeUICSSObject => ({
  border: isAvailable ? "2px solid #00F6D2" : "2px solid #FF746B",
});

export const textStyles = ({ isAvailable, isValid }: SearchResultStyleProps): ThemeUICSSObject => ({
  color: isAvailable && isValid ? "#00F6D2" : "#FF746B",
});

export const containerStyles = ({ isAvailable }: SearchResultStyleProps): ThemeUICSSObject => ({
  flexDirection: 'column',
  padding: '30px 0px'
});