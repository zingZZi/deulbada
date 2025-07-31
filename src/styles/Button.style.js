import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const radiusMap = {
  medium: '30px',
  small: '32px',
  xsmall: '26',
  round: '50%',
};

const fontSize = {
  xLarge: '1.8rem',
  large: '1.6rem',
  base: '1.4rem',
  small: '1.2rem',
  xSmall: '1.0rem',
  icon: '0px',
};

const sharedBaseStyle = css`
  width: ${(props) => (props.size === 'full-size' ? '100%' : 'auto')};
  margin: 0;
  padding: ${(props) => props.padding};
  border-radius: ${(props) => radiusMap[props.radius] || '44px'};
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
  font-size: ${(props) => fontSize[props.fontSize] || '1.4rem'};
  &:disabled {
    cursor: not-allowed;
  }
`;
const BasicBtnStyle = css`
  ${sharedBaseStyle}
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white100};
`;
const LineBtnStyle = css`
  ${sharedBaseStyle}

  background-color: ${({ theme }) => theme.colors.white100};
  border: 1px solid ${({ theme }) => theme.colors.white300};
  color: ${({ theme }) => theme.colors.white700};
`;
//BasicBtn
export const BasicBtn = styled.button`
  ${BasicBtnStyle}
`;
export const BasicLink = styled(Link)`
  ${BasicBtnStyle}
`;
//LineBtn
export const LineBtn = styled.button`
  ${LineBtnStyle};
`;
export const LineLink = styled(Link)`
  ${LineBtnStyle}
`;
