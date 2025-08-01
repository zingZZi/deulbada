import styled from 'styled-components';
import {
  House,
  MessageCircle,
  SquarePlus,
  User,
  Heart,
  Share2,
  LayoutGrid,
  LayoutList,
} from 'lucide-react';

const HouseIcon = styled(House)`
  color: ${({ theme }) => theme.colors.white700};
  &.primary {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
const MessageCircleIcon = styled(MessageCircle)`
  width: 2rem;
  height: 2rem;
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
const HeartIcon = styled(Heart)`
  width: 2rem;
  height: 2rem;
  color: ${({ theme }) => theme.colors.white700};
  &.primary {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
const Share2Icon = styled(Share2)`
  color: ${({ theme }) => theme.colors.white700};
  &.primary {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
export const LayoutGridIcon = styled(LayoutGrid)`
  color: ${({ theme }) => theme.colors.white300};
  &.active {
    color: ${({ theme }) => theme.colors.white700};
  }
`;
export const LayoutListIcon = styled(LayoutList)`
  color: ${({ theme }) => theme.colors.white300};
  &.active {
    color: ${({ theme }) => theme.colors.white700};
  }
`;

export { HouseIcon, MessageCircleIcon, SquarePlusIcon, UserIcon, HeartIcon, Share2Icon };
