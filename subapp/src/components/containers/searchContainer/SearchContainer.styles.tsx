import { StyleSheet } from 'react-native';
import { isDeviceTablet } from '../../../helpers/table_utils';

export const styles = StyleSheet.create({
  inputContainer: {
    width: isDeviceTablet ? '50%' : '100%',
  },
  spacing: {
    height: 12,
  },
});
