import { Dimensions, PixelRatio } from 'react-native';
import { DeviceType } from './utilsTypes';

export const detectDeviceType = (): DeviceType => {
  const { width, height } = Dimensions.get('window');
  const pixelDensity = PixelRatio.get();
  const adjustedWidth = width * pixelDensity;
  const adjustedHeight = height * pixelDensity;

  if (
    pixelDensity < 1.75 &&
    (adjustedWidth >= 1000 || adjustedHeight >= 1000)
  ) {
    return 'tablet';
  } else if (
    pixelDensity === 2 &&
    (adjustedWidth >= 1920 || adjustedHeight >= 1920)
  ) {
    return 'tablet';
  } else if (width < 768) {
    return 'mobile';
  } else {
    return 'web';
  }
};
