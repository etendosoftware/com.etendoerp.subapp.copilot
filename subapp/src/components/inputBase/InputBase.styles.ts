import { Platform, StyleSheet } from 'react-native';
import { NEUTRAL_50, NEUTRAL_800, PRIMARY_100 } from '../../styles/colors';
import { AppPlatform } from '../../helpers/utilsTypes';

export const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: -0.16,
    color: NEUTRAL_800,
  },
  container: {
    backgroundColor: NEUTRAL_50,
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  containerInput: {
    flexDirection: 'row',
    borderRadius: 7,
    overflow: 'hidden',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: NEUTRAL_50,
  },
  textInput: {
    backgroundColor: NEUTRAL_50,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    letterSpacing: -0.16,
    lineHeight: Platform.OS === AppPlatform.web ? 26 : undefined,
    color: PRIMARY_100,
    flex: 1,
    textAlignVertical: 'center',
  },
  helperText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: -0.14,
  },
  gridContainer: {
    alignItems: 'center',
    backgroundColor: NEUTRAL_50,
    height: '100%',
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: NEUTRAL_50,
    height: '100%',
  },
  icon: {
    width: 24,
    height: 24,
  },
});
export const heightTextInput = 52;
export const paddingTopTextInputMultiline = 12;
export const paddingHorizontalTextInput = 8;
