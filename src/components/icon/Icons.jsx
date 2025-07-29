import { EllipsisVertical, ArrowLeft, Image } from 'lucide-react';
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
export { ImagelIcon, EllipsisVerticalIcon, ArrowIcon };
