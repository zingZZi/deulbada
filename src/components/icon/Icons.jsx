import { EllipsisVertical, ArrowLeft, Image, Copy, Search } from 'lucide-react';
import { useTheme } from 'styled-components';
const ImagelIcon = () => {
  const theme = useTheme();
  return <ImagelIcon color={theme.colors.white100} size={24} />;
};
const EllipsisVerticalIcon = () => {
  const theme = useTheme();
  return <EllipsisVertical color={theme.colors.white700} size={24} />;
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
export { ImagelIcon, EllipsisVerticalIcon, ArrowIcon };
