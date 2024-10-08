import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F2F5F9',
  },
  messageText: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: 'grey',
  },
  messagesContainer: {
    paddingHorizontal: 12,
  },
  dropdownContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#D3D6E1',
  },
  inputContainer: {
    padding: 12,
    backgroundColor: '#F2F5F9',
  },
});