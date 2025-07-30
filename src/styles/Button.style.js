import styled from 'styled-components';
const paddingMap = {
  medium: '8px 40px',
  small: '7px 32px',
  xsmall: '7px 11px',
};
const radiusMap = {
  medium: '30px',
  small: '32px',
  xsmall: '26',
};
const BasicBtn = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  width: ${(props) => (props.size === 'full-size' ? '100%' : 'auto')};
  margin: 0;
  color: ${({ theme }) => theme.colors.white100};
  padding: ${(props) => paddingMap[props.padding] || '13px 0'};
  border-radius: ${(props) => radiusMap[props.radius] || '44px'};
  cursor: pointer;
  &:disabled {
    background-color: ${({ theme }) => theme.colors.primaryOpacity};
    border: none;
  }
`;
const LineBtn = styled(BasicBtn)`
  background-color: ${({ theme }) => theme.colors.white100};
  color: ${({ theme }) => theme.colors.white700};
  border: 1px solid ${({ theme }) => theme.colors.white300};
`;

export { BasicBtn, LineBtn };
