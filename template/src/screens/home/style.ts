import { StyleSheet } from 'react-native';
import theme from '../../styles/theme';

export const styles = StyleSheet.create({
  animatedMessageContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: theme.colors.palette.baselineColor.neutral[20],
    backgroundColor: theme.colors.palette.baselineColor.neutral[0],
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  inputContainer: {
    padding: 12,
    backgroundColor: theme.colors.palette.baselineColor.neutral[0],
  },
  messageText: {
    fontSize: 16,
  },
  messagesContainer: {
    paddingHorizontal: 12,
  },
  processingText: {
    color: theme.colors.palette.baselineColor.transparentNeutral[70],
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: theme.colors.palette.baselineColor.neutral[0],
  },
  textMessageContainer: {
    marginTop: 12,
  },
  timestamp: {
    fontSize: 12,
    color: theme.colors.palette.baselineColor.neutral[0],
  },
});
