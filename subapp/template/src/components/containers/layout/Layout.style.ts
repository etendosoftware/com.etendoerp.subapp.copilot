import { ViewStyle } from 'react-native';
import { paddingVerticalContainer } from '../../../helpers/defaultStyle';

export const defaultStyle: ViewStyle = {
  ...paddingVerticalContainer(),
  display: 'flex',
  flex: 1,
  width: '100%',
  height: '100%',
  justifyContent: 'flex-start',
  alignItems: 'center',
};
