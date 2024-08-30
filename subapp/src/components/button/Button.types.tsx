import { ColorValue, DimensionValue, TextStyle, ViewStyle } from 'react-native';

export type ButtonStyleType =
  | 'primary'
  | 'secondary'
  | 'terciary'
  | 'whiteBorder'
  | 'white';

export type buttonStyleVariant = Record<
  ButtonStyleType,
  {
    container: ViewStyle;
    text: TextStyle;
    containerDisabled: ViewStyle;
    textDisabled: TextStyle;
    imageColor: ColorValue;
    imageDisabled: ColorValue;
  }
>;
export interface IconStyleProps {
  marginRight?: DimensionValue;
  marginLeft?: DimensionValue;
}
export interface ButtonProps {
  onPress?: (...params: any[]) => void;
  text?: string;
  typeStyle: ButtonStyleType;
  iconLeft?: React.ReactElement;
  iconRight?: React.ReactElement;
  disabled?: boolean;
  width?: DimensionValue;
  height?: DimensionValue;
  fontSize?: number;
  paddingHorizontal?: DimensionValue;
  paddingVertical?: DimensionValue;
  loading?: boolean;
  metadata?: any;
}
