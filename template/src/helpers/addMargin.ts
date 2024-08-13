import {Platform} from 'react-native';

const addMarginContainer = () => {
  if (Platform.OS === 'android' || Platform.OS === 'ios') {
    return {margin: 20};
  }
};

export default addMarginContainer;
