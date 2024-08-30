import { StyleProp, ViewStyle } from 'react-native';

export interface LayoutProps {
  children?: React.ReactNode;
  isScrollVertical?: boolean;
  isKeyboadAvoid?: boolean;
  style?: StyleProp<ViewStyle>;
}
