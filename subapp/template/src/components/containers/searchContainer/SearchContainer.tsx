import React, { FC } from 'react';
import { View } from 'react-native';
import { DEFAULT_SEARCH_WIDTH } from './SearchContainer.default';
import { ISearchContainer } from './SearchContainer.types';
import { GridContainer } from '../gridContainer';
import { SearchInput } from '../../inputBase';

const SearchContainer: FC<ISearchContainer> = ({
  styleContainer,
  styleGridContainer,
  buttons,
  widthSearchInput = DEFAULT_SEARCH_WIDTH,
  gridGapHorizontal,
  gridGapVertical,
  ...inputBaseProps
}) => {
  return (
    <GridContainer
      stylesContainer={styleContainer}
      components={[
        <View style={[{ width: widthSearchInput }]}>
          <SearchInput {...inputBaseProps} />
        </View>,
        <GridContainer
          gapVertical={gridGapVertical}
          gapHorizontal={gridGapHorizontal}
          stylesContainer={styleGridContainer}
          components={buttons}
        />,
      ]}
    />
  );
};

export default SearchContainer;
