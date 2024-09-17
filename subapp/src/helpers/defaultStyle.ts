import { ViewStyle } from 'react-native';
import { detectDeviceType } from './responsiveUtils';

export const paddingVerticalContainer = (): ViewStyle => {
  switch (detectDeviceType()) {
    case 'mobile':
      return { paddingVertical: 20, paddingHorizontal: 24 };
    case 'tablet':
      return { paddingVertical: 28, paddingHorizontal: 32 };
    case 'web':
      return { paddingVertical: 48, paddingHorizontal: 52 };
    default:
      return {};
  }
};
