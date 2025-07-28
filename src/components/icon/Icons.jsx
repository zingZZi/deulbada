import { Camera } from 'lucide-react';
import { useTheme } from 'styled-components';

const Test = () => {
  const theme = useTheme();
  return <Camera color={theme.colors.primary} size={24} />;
};

export { Test };
