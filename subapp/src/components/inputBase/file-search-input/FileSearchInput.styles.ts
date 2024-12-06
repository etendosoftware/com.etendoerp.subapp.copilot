import { StyleSheet, Platform, Dimensions } from 'react-native';
import {
  NEUTRAL_0,
  NEUTRAL_100,
  NEUTRAL_1000,
  NEUTRAL_300,
  NEUTRAL_400,
  NEUTRAL_50,
  PRIMARY_100,
} from '../../../styles/colors';
import { isWebPlatform } from '../../../helpers/functions_utils';
export const mediaQueryWidths = {
  MOBILE: 480,
  TABLET: 768,
  DESKTOP: 1280,
};

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    flex: 1,
  },
  fileNameContainer: {
    alignItems: 'center',
    backgroundColor: NEUTRAL_50,
    borderColor: NEUTRAL_400,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    paddingHorizontal: 8,
    minHeight: 56,
    flex: 1,
  },
  fileNameLeftContainer: {
    flexDirection: 'row',
  },
  fileNameRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
  },
  fileNameLeftContent: {
    height: 24,
    width: '100%',
  },
  fileNameLoadedLeftContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  checkCircleIcon: {
    height: 24,
    width: 24,
  },
  errorIcon: {
    height: 24,
    width: 24,
  },
  deleteIcon: {
    height: 24,
    width: 24,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 16,
    width: '100%',
  },
  loadingText: {
    fontSize: 14,
  },
  fileContent: {
    height: isWebPlatform() ? undefined : 28,
    flex: 1,
  },
  fileNameText: {
    color: NEUTRAL_1000,
    fontWeight: '500',
    fontSize: Platform.OS === 'web' ? 14 : 16,
    paddingBottom: Platform.OS === 'web' ? 4 : undefined,
    overflow: 'hidden',
    width: '100%',
    marginLeft: Platform.OS === 'web' ? undefined : 8,
  },
  fileIcon: {
    height: 24,
    width: 24,
  },
  fileContainer: {
    position: 'absolute',
    width: '100%',
  },
  progressBarFill: {
    backgroundColor: NEUTRAL_100,
    borderRadius: 10,
  },
  progressBarContainer: {
    backgroundColor: NEUTRAL_300,
    borderRadius: 16,
    marginLeft: Platform.OS === 'web' ? undefined : 8,
    width: '100%',
  },
  progressBar: {
    backgroundColor: NEUTRAL_1000,
    borderRadius: 2,
  },
  containerXicon: {
    marginLeft: 8,
    marginRight: 4,
  },
  fileIconContainer: {
    paddingRight: 8,
  },
  iconWrapper: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: PRIMARY_100,
    borderRadius: 8,
    height: 16,
    minWidth: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 2,
    borderWidth: 1,
    borderColor: NEUTRAL_0,
  },
  badgeText: {
    color: NEUTRAL_0,
    fontSize: 10,
    fontWeight: 'bold',
  },
});
