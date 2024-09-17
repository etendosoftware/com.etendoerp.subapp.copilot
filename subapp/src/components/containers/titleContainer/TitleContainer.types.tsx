import { ReactNode } from 'react';
import { TextStyle, ViewStyle } from 'react-native';

export interface ITitleContainer {
  buttons?: ReactNode[];
  styleContainer?: ViewStyle;
  styleGridContainer?: ViewStyle;
  styleTitle?: TextStyle;
  gridGapHorizontal?: number;
  gridGapVertical?: number;
  title: string;
}
