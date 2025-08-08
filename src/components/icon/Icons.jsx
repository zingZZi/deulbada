import { EllipsisVertical, ArrowLeft, Image, Copy, Search } from 'lucide-react';
import { useTheme } from 'styled-components';
const ImageIcon = () => {
  const theme = useTheme();
  return <Image color={theme.colors.white100} size={24} />;
};
const EllipsisVerticalIcon = (props) => {
  const theme = useTheme();
  return <EllipsisVertical color={theme.colors.white700} {...props} />;
};
const ArrowIcon = (props) => {
  const theme = useTheme();
  return <ArrowLeft color={theme.colors.black} {...props} />;
};
export const CopyIcon = (props) => {
  const theme = useTheme();
  return <Copy color={theme.colors.white100} {...props} />;
};
export const SearchIcon = (props) => {
  const theme = useTheme();
  return <Search color={theme.colors.white700} {...props} />;
};
export { ImageIcon, EllipsisVerticalIcon, ArrowIcon };
