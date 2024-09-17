import { ColumnsMetadata } from '../components/table/Table.types';
import { NEUTRAL_0, QUATERNARY_10 } from '../styles/colors';
import { Dimensions, PixelRatio, Platform, ViewStyle } from 'react-native';
// getting screen width and height
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export const isWeb = Platform.OS === 'web';

export const removeHeaderBorder = (header?: string) => {
  return (
    !header && {
      borderTopWidth: 0,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    }
  );
};

export const isOdd = (index: number) => {
  return index % 2 !== 0;
};

export const paintOddRows = (index: number) => {
  return isOdd(index)
    ? { backgroundColor: QUATERNARY_10 }
    : { backgroundColor: NEUTRAL_0 };
};

// function that allows to know if the screen of the device is a cell phone or a tablet
export const isTablet = () => {
  let pixelDensity = PixelRatio.get();
  const adjustedWidth = width * pixelDensity;
  const adjustedHeight = height * pixelDensity;
  if (
    pixelDensity < 1.75 &&
    (adjustedWidth >= 1000 || adjustedHeight >= 1000)
  ) {
    return true;
  } else {
    return (
      pixelDensity === 2 && (adjustedWidth >= 1920 || adjustedHeight >= 1920)
    );
  }
};

export const isDeviceTablet = isTablet();

export const disableOutline = (): ViewStyle | undefined => {
  if (isWeb) {
    return { outline: 'none' } as ViewStyle;
  }
};

export const cursorPointer = (): ViewStyle | undefined => {
  if (isWeb) {
    return { cursor: 'pointer' } as ViewStyle;
  }
};

export const findPrimaryId = (col: ColumnsMetadata[], data: any) => {
  let primary: string = '';
  for (const element of col) {
    if (element.primary === true) {
      if (element.key) {
        primary = data[element.key];
        break;
      }
    }
  }
  return primary;
};
