import { StyleSheet, ViewStyle } from 'react-native';
import {
  NEUTRAL_300,
  NEUTRAL_50,
  PRIMARY_100,
  QUATERNARY_10,
  QUATERNARY_50,
  SECONDARY_100,
  SECONDARY_30,
  TERTIARY_50,
} from '../../styles/colors';
import { buttonStyleVariant } from './Button.types';

const commonButtonStyles: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 8,
};

export const ButtonStyleVariant: buttonStyleVariant = {
  primary: {
    container: {
      backgroundColor: PRIMARY_100,
      ...commonButtonStyles,
      height: '100%',
    },
    text: {
      color: NEUTRAL_50,
      fontWeight: '600',
    },
    containerDisabled: {
      backgroundColor: NEUTRAL_300,
      ...commonButtonStyles,
      height: '100%',
    },
    textDisabled: {
      color: NEUTRAL_50,
      fontWeight: 'bold',
    },
    imageColor: NEUTRAL_50,
    imageDisabled: NEUTRAL_50,
  },
  secondary: {
    container: {
      backgroundColor: SECONDARY_100,
      ...commonButtonStyles,
    },
    text: {
      color: PRIMARY_100,
      fontWeight: 'bold',
    },
    containerDisabled: {
      backgroundColor: SECONDARY_30,
      ...commonButtonStyles,
    },
    textDisabled: {
      color: NEUTRAL_300,
      fontWeight: 'bold',
    },
    imageColor: PRIMARY_100,
    imageDisabled: NEUTRAL_300,
  },
  terciary: {
    container: {
      backgroundColor: QUATERNARY_50,
      ...commonButtonStyles,
    },
    text: {
      color: PRIMARY_100,
      fontWeight: 'bold',
    },
    containerDisabled: {
      backgroundColor: QUATERNARY_10,
      ...commonButtonStyles,
    },
    textDisabled: {
      color: NEUTRAL_300,
      fontWeight: 'bold',
    },
    imageColor: PRIMARY_100,
    imageDisabled: NEUTRAL_300,
  },
  whiteBorder: {
    container: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: PRIMARY_100,
      ...commonButtonStyles,
    },
    text: {
      color: PRIMARY_100,
      fontWeight: 'bold',
    },
    containerDisabled: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: TERTIARY_50,
      ...commonButtonStyles,
    },
    textDisabled: {
      color: NEUTRAL_300,
      fontWeight: 'bold',
    },
    imageColor: PRIMARY_100,
    imageDisabled: NEUTRAL_300,
  },
  white: {
    container: {
      backgroundColor: 'transparent',
      ...commonButtonStyles,
    },
    text: {
      color: PRIMARY_100,
      fontWeight: 'bold',
    },
    containerDisabled: {
      backgroundColor: 'transparent',
      ...commonButtonStyles,
    },
    textDisabled: {
      color: NEUTRAL_300,
      fontWeight: 'bold',
    },
    imageColor: PRIMARY_100,
    imageDisabled: NEUTRAL_300,
  },
};

export const styles = StyleSheet.create({
  indicatorCenterStyle: {
    position: 'absolute',
  },
});
