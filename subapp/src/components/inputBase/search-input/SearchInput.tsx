import React from 'react';
import InputBase from '../InputBase';
import { SearchIcon } from '../../../assets/images/icons';
import Button from '../../button/Button';
import { ISearchInput } from './SearchInput.types';
import { styles } from './SearchInput.style';
import { RightButtons } from '../InputBase.types';

const SearchInput = ({ onSubmit,rightButtons, ...inputBaseProps }: ISearchInput) => {
  const handleOnPress = () => {
    if (onSubmit) {
      onSubmit(inputBaseProps?.value ?? '');
    }
  };
  const SearchButton = (
    <Button
          typeStyle={'white'}
          paddingHorizontal={0}
          paddingVertical={0}
          onPress={handleOnPress}
          iconLeft={<SearchIcon style={styles.icon} />}
        />
  );
  let buttons: RightButtons | undefined = rightButtons;
    buttons = buttons ? [...buttons, SearchButton] : [SearchButton];
  
  return (
    <InputBase
      {...inputBaseProps}
      rightButtons={buttons}
    />
  );
};

export default SearchInput;
