import { StyleSheet } from "react-native";
import theme from "../../styles/theme";
import { NEUTRAL_0, NEUTRAL_300 } from "../../styles/colors";

export const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: NEUTRAL_0,
    borderBottomWidth: 1,
    borderBottomColor: NEUTRAL_300,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'Inter',
    color: theme.colors.palette.baselineColor.transparentNeutral[70],
  },
});
