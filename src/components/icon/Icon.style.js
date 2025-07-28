import styled from 'styled-components';
import { Camera } from 'lucide-react';

const PrimaryCameraIcon = styled(Camera)`
  color: ${({ theme }) => theme.colors.primary};
`;
export { PrimaryCameraIcon };
