import styled from 'styled-components';
import { House, MessageCircle, SquarePlus, User } from 'lucide-react';

const HouseIcon = styled(House)`
  color: ${({ theme }) => theme.colors.white700};
  &.primary {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
const MessageCircleIcon = styled(MessageCircle)`
  color: ${({ theme }) => theme.colors.white700};
  &.primary {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
const SquarePlusIcon = styled(SquarePlus)`
  color: ${({ theme }) => theme.colors.white700};
  &.primary {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
const UserIcon = styled(User)`
  color: ${({ theme }) => theme.colors.white700};
  &.primary {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
export { HouseIcon, MessageCircleIcon, SquarePlusIcon, UserIcon };
