import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface IGridContainer {
  gapHorizontal?: number;
  gapVertical?:number;
  components?: ReactNode[];
  stylesContainer?: ViewStyle | ViewStyle[];
}
