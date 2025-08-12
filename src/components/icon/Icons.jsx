import { EllipsisVertical, ArrowLeft, PackageSearch, Copy, Search, Camera } from 'lucide-react';
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
export const PackageSearchIcon = (props) => {
  const theme = useTheme();
  return <PackageSearch color={theme.colors.white700} {...props} />;
};
export const CameraIcon = (props) => {
  const theme = useTheme();
  return <Camera color={theme.colors.white700} {...props} />;
};
export { ImageIcon, EllipsisVerticalIcon, ArrowIcon };
